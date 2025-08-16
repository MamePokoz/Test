'use client';
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, User, Shield, AlertTriangle, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import './adminlogin.css';
import Swal from "sweetalert2";

export default function AdminLoginPage() {
  const router = useRouter();
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_TIME = 300; // 5 นาที

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);
  const [lastLogin, setLastLogin] = useState(null);

  const PASSWORD_TIME_LIMIT = 20; // วินาที
  const [timeLeft, setTimeLeft] = useState(PASSWORD_TIME_LIMIT);

  useEffect(() => {
    if (isLoading) return; // 👉 ถ้ากดเข้าสู่ระบบ ให้หยุดนับเวลา

    if (timeLeft > 0) {
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
        } else {
        setFormData({ username: "", password: "" });
        generateCaptcha();
            Swal.fire({
            icon: "error",
            title: "หมดเวลา",
            text: "กรุณากรอกข้อมูลใหม่ภายในเวลาที่กำหนด",
            confirmButtonColor: "#ef4444"
        });
            setTimeLeft(PASSWORD_TIME_LIMIT); // reset timer ใหม่
        }
    }, [timeLeft]);

  // เพิ่มใน AdminLoginPage ด้านบน
    useEffect(() => {
  // ❌ ปิดการคลิกขวา
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

  // ❌ ปิด DevTools (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
    const handleKeyDown = (e) => {
        if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "u")
        ) {
        e.preventDefault();
            Swal.fire({
            icon: "warning",
            title: "แจ้งเตือน",
            text: "ไม่สามารถเปิด Developer Tools ได้",
            confirmButtonColor: "#6366f1"
        });
        }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

  // โหลด captcha + last login
  useEffect(() => {
    generateCaptcha();
    const storedLogin = localStorage.getItem('lastLoginTime');
    if (storedLogin) setLastLogin(new Date(parseInt(storedLogin)).toLocaleString('th-TH'));

    const storedLock = sessionStorage.getItem('lockoutTime');
    if (storedLock) {
      const current = Date.now();
      const lockUntil = parseInt(storedLock);
      if (current < lockUntil) {
        setIsLocked(true);
        setLockTimeRemaining(Math.ceil((lockUntil - current) / 1000));
      }
    }
  }, []);

  // จัดการ countdown lock
  useEffect(() => {
    let interval;
    if (isLocked && lockTimeRemaining > 0) {
      interval = setInterval(() => {
        setLockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setLoginAttempts(0);
            sessionStorage.removeItem('lockoutTime');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockTimeRemaining]);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let text = '';
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(text);
    setCaptchaInput('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLocked) {
      setError(`บัญชีถูกล็อค กรุณารอ ${lockTimeRemaining} วินาที`);
      return;
    }

    if (!formData.username.trim() || !formData.password.trim()) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }
    if (captchaInput !== captcha) {
      setError('รหัส CAPTCHA ไม่ถูกต้อง');
      generateCaptcha();
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // จำลอง API

    const validCredentials = { username: 'admin', password: 'admin123' };

    if (formData.username === validCredentials.username &&
        formData.password === validCredentials.password) {
      localStorage.setItem('lastLoginTime', Date.now().toString());
      setLastLogin(new Date().toLocaleString('th-TH'));
      setSuccess('เข้าสู่ระบบสำเร็จ! กำลังเข้าสู่ระบบ...');
      setTimeout(() => router.push('/admin/users'), 1500); // ✅ redirect ไปหน้า /admin
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      sessionStorage.setItem('loginAttempts', newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setLockTimeRemaining(LOCKOUT_TIME);
        sessionStorage.setItem('lockoutTime', (Date.now() + LOCKOUT_TIME * 1000).toString());
        setError(`บัญชีถูกล็อค 5 นาที เนื่องจากพยายามผิด ${MAX_ATTEMPTS} ครั้ง`);
      } else {
        setError(`ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (เหลือ ${MAX_ATTEMPTS - newAttempts} ครั้ง)`);
      }
      generateCaptcha();
    }
    setIsLoading(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="text-center mb-6">
          <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Admin Panel</h1>
          <p className="text-gray-600 text-black-500">ระบบจัดการหลังบ้าน</p>
          <p className="text-sm text-black-500 text-center">
            ⏳ เวลาที่เหลือในการใส่รหัสผ่าน: <span className="font-bold text-red-500">{timeLeft}s</span>
        </p>
        </div>

        {/* แจ้งเตือน */}
        {error && <div className="admin-error"><AlertTriangle className="h-5 w-5" />{error}</div>}
        {success && <div className="admin-success">{success}</div>}
        {isLocked && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            บัญชีถูกล็อค เหลือเวลา {formatTime(lockTimeRemaining)}
          </div>
        )}
        {loginAttempts > 0 && !isLocked && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm text-black-800">
            ⚠️ พยายามไม่สำเร็จ {loginAttempts} ครั้ง
          </div>
        )}

        {/* ฟอร์ม */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="ชื่อผู้ใช้"
              className="admin-login-input pl-10"
              disabled={isLoading || isLocked}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="รหัสผ่าน"
              className="admin-login-input pl-10 pr-10"
              disabled={isLoading || isLocked}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
            >
                {showPassword 
                ? <EyeOff className="h-5 w-5"/> 
                : <Eye className="h-5 w-5"/>}
            </button>
          </div>

          {/* CAPTCHA */}
          <div className="admin-captcha-box">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-black font-mono text-xl tracking-widest p-3 rounded-lg select-none mb-3">
              {captcha}
            </div>
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="กรอกรหัส CAPTCHA"
              className="admin-login-input text-center tracking-widest mb-2"
              disabled={isLoading || isLocked}
            />
            <button
                type="button"
                onClick={generateCaptcha}
                className="captcha-refresh-btn"
            >
                <RefreshCcw className={`h-4 w-4 ${generateCaptcha ? "refreshing" : ""}`} />
                รีเฟรช
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || isLocked}
            className="admin-login-btn"
          >
            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <p className="admin-footer">Last Login: {lastLogin || "ไม่เคยเข้าระบบ"}</p>
      </div>
    </div>
  );
}
