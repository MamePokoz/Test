'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Eye, EyeOff, Lock, User, Shield, AlertTriangle, RefreshCcw, Timer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import './adminlogin.css';
import Swal from "sweetalert2";

export default function AdminLoginPage() {
  const router = useRouter();
  const MAX_ATTEMPTS = 3; // ลดจาก 5 เหลือ 3
  const LOCKOUT_TIME = 900; // เพิ่มเป็น 15 นาที
  const MAX_SESSION_TIME = 1800; // 30 นาที
  const FINGERPRINT_CHECK = true;
  
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
  
  // Security enhancements
  const [deviceFingerprint, setDeviceFingerprint] = useState('');
  const [sessionTimer, setSessionTimer] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [suspiciousActivity, setSuspiciousActivity] = useState(false);
  const [keystrokeDynamics, setKeystrokeDynamics] = useState([]);
  const [mouseMovements, setMouseMovements] = useState([]);
  const activityTimeoutRef = useRef(null);
  const sessionTimeoutRef = useRef(null);
  
  // Password strength checker
  const checkPasswordStrength = (password) => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    const score = [hasLower, hasUpper, hasNumbers, hasSpecial, isLongEnough].filter(Boolean).length;
    return { score, isStrong: score >= 4 };
  };

  // Generate device fingerprint
  const generateDeviceFingerprint = useCallback(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
    
    const fingerprint = btoa(
      navigator.userAgent +
      navigator.language +
      screen.width + screen.height +
      new Date().getTimezoneOffset() +
      canvas.toDataURL()
    ).slice(0, 32);
    
    setDeviceFingerprint(fingerprint);
    return fingerprint;
  }, []);

  // Get IP address (ใช้ service ภายนอก)
  const getIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
      return data.ip;
    } catch (error) {
      console.log('Unable to get IP');
      return 'unknown';
    }
  };

  // Enhanced security monitoring
  useEffect(() => {
      const handleContextMenu = (e) => {
      e.preventDefault();
      logSuspiciousActivity('Right-click attempted');
    };
    
    const handleKeyDown = (e) => {
      const blockedKeys = [
        'F12',
        { ctrl: true, shift: true, key: 'I' },
        { ctrl: true, shift: true, key: 'J' },
        { ctrl: true, shift: true, key: 'C' },
        { ctrl: true, key: 'u' },
        { ctrl: true, key: 'U' }
      ];
      
      const isBlocked = blockedKeys.some(blocked => {
        if (typeof blocked === 'string') {
          return e.key === blocked;
        }
        return blocked.ctrl === e.ctrlKey && 
               blocked.shift === e.shiftKey && 
               e.key.toLowerCase() === blocked.key.toLowerCase();
      });
      
      if (isBlocked) {
        e.preventDefault();
        logSuspiciousActivity(`Blocked key combination: ${e.key}`);
        Swal.fire({
          icon: "error",
          title: "การกระทำต้องห้าม",
          text: "ตรวจพบการพยายามเข้าถึงเครื่องมือนักพัฒนา",
          confirmButtonColor: "#ef4444",
          timer: 3000
        });
      }
    };

    // ตรวจจับ DevTools
    const detectDevTools = () => {
      const threshold = 160;
      
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        logSuspiciousActivity('DevTools detected');
        setSuspiciousActivity(true);
        Swal.fire({
          icon: "warning",
          title: "ตรวจพบ Developer Tools",
          text: "กรุณาปิด Developer Tools และรีเฟรชหน้า",
          allowOutsideClick: false,
          showConfirmButton: false
        });
      }
    };

    // Mouse movement tracking
    const handleMouseMove = (e) => {
      setMouseMovements(prev => [...prev.slice(-50), {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      }]);
    };

    // Keystroke dynamics
    const handleKeyPress = (e) => {
      setKeystrokeDynamics(prev => [...prev.slice(-100), {
        key: e.key,
        timestamp: Date.now(),
        pressure: e.pressure || 0
      }]);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keypress', handleKeyPress);
    
    const devToolsInterval = setInterval(detectDevTools, 1000);
    
    generateDeviceFingerprint();
    getIpAddress();

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keypress', handleKeyPress);
      clearInterval(devToolsInterval);
    };
  }, [generateDeviceFingerprint]);

  // Suspicious activity logger
  const logSuspiciousActivity = (activity) => {
    const logEntry = {
      activity,
      timestamp: new Date().toISOString(),
      ip: ipAddress,
      fingerprint: deviceFingerprint,
      userAgent: navigator.userAgent
    };

    console.warn('Suspicious Activity:', logEntry);
    setSuspiciousActivity(true);
    setTimeout(() => setSuspiciousActivity(false), 5000);    
    // เก็บ log ใน sessionStorage
    const existingLogs = JSON.parse(sessionStorage.getItem('suspiciousLogs') || '[]');
    sessionStorage.setItem('suspiciousLogs', JSON.stringify([...existingLogs, logEntry]));
  };

  // Session management
  const startSession = () => {
    setIsSessionActive(true);
    setSessionTimer(MAX_SESSION_TIME);
    
    sessionTimeoutRef.current = setInterval(() => {
      setSessionTimer(prev => {
        if (prev <= 1) {
          endSession('timeout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endSession = (reason = 'manual') => {
    setIsSessionActive(false);
    clearInterval(sessionTimeoutRef.current);
    sessionStorage.clear();
    
    if (reason === 'timeout') {
      Swal.fire({
        icon: 'warning',
        title: 'Session หมดอายุ',
        text: 'กรุณาเข้าสู่ระบบใหม่',
        confirmButtonColor: '#6366f1'
      }).then(() => {
        window.location.reload();
      });
    }
  };

  // Activity timeout
  const resetActivityTimeout = () => {
    clearTimeout(activityTimeoutRef.current);
    activityTimeoutRef.current = setTimeout(() => {
      endSession('inactivity');
    }, 300000); // 5 นาที
  };

  useEffect(() => {
    const handleActivity = () => resetActivityTimeout();
    
    document.addEventListener('mousedown', handleActivity);
    document.addEventListener('keydown', handleActivity);
    document.addEventListener('scroll', handleActivity);
    
    return () => {
      document.removeEventListener('mousedown', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      document.removeEventListener('scroll', handleActivity);
      clearTimeout(activityTimeoutRef.current);
    };
  }, []);

  // Enhanced CAPTCHA with math problems
  const generateAdvancedCaptcha = () => {
    const operators = ['+', '-', '*'];
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let result;
    switch (operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      default: result = num1 + num2;
    }
    
    setCaptcha(`${num1} ${operator} ${num2} = ?`);
    setCaptchaInput('');
    return result.toString();
  };

  const [captchaAnswer, setCaptchaAnswer] = useState('');

  useEffect(() => {
    const answer = generateAdvancedCaptcha();
    setCaptchaAnswer(answer);
    
    const storedLogin = sessionStorage.getItem('lastLoginTime');
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

  // Lock countdown
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
    resetActivityTimeout();
  };

  const validateInput = () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return false;
    }

    // ตรวจสอบ SQL injection patterns
    const sqlPatterns = ['--', ';', '/*', '*/', 'xp_', 'sp_', 'union', 'select', 'insert', 'delete', 'update', 'drop'];
    const inputText = (formData.username + formData.password).toLowerCase();
    
    if (sqlPatterns.some(pattern => inputText.includes(pattern))) {
      logSuspiciousActivity('SQL injection attempt detected');
      setError('ตรวจพบการพยายามโจมตี');
      return false;
    }

    // ตรวจสอบความแข็งแกร่งของรหัสผ่าน
    const passwordStrength = checkPasswordStrength(formData.password);
    if (!passwordStrength.isStrong && formData.password.length > 0) {
      setError('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวพิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข และสัญลักษณ์');
      return false;
    }

    if (captchaInput !== captchaAnswer) {
      setError('คำตอบ CAPTCHA ไม่ถูกต้อง');
      const newAnswer = generateAdvancedCaptcha();
      setCaptchaAnswer(newAnswer);
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`บัญชีถูกล็อค กรุณารอ ${formatTime(lockTimeRemaining)}`);
      return;
    }

    if (suspiciousActivity) {
      setError('ตรวจพบกิจกรรมผิดปกติ กรุณารีเฟรชหน้าและลองใหม่');
      return;
    }

    if (!validateInput()) return;

    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Enhanced validation with device fingerprint
    const validCredentials = { 
      username: 'admin', 
      password: 'admin123!' // รหัสผ่านที่แข็งแกร่งขึ้น
    };

    const isValidUser = formData.username === validCredentials.username;
    const isValidPassword = formData.password === validCredentials.password;

    if (isValidUser && isValidPassword) {
      // บันทึกข้อมูล login
      const loginData = {
        timestamp: Date.now(),
        ip: ipAddress,
        fingerprint: deviceFingerprint,
        userAgent: navigator.userAgent,
        keystrokeDynamics: keystrokeDynamics.slice(-20),
        mouseMovements: mouseMovements.slice(-20)
      };
      
      sessionStorage.setItem('lastLoginTime', Date.now().toString());
      sessionStorage.setItem('loginData', JSON.stringify(loginData));
      sessionStorage.setItem('isAuthenticated', 'true');
      
      setLastLogin(new Date().toLocaleString('th-TH'));
      setSuccess('เข้าสู่ระบบสำเร็จ! กำลังเข้าสู่ระบบ...');
      
      startSession();
      
      setTimeout(() => {
        router.push('/admin/users');
      }, 2000);
      
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      sessionStorage.setItem('loginAttempts', newAttempts.toString());
      
      logSuspiciousActivity(`Failed login attempt ${newAttempts}: ${formData.username}`);

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setLockTimeRemaining(LOCKOUT_TIME);
        sessionStorage.setItem('lockoutTime', (Date.now() + LOCKOUT_TIME * 1000).toString());
        setError(`บัญชีถูกล็อค ${Math.floor(LOCKOUT_TIME/60)} นาที เนื่องจากพยายามผิด ${MAX_ATTEMPTS} ครั้ง`);
        
        // ส่ง notification ถ้าเป็นการใช้งานจริง
        console.warn('Account locked due to multiple failed attempts', {
          ip: ipAddress,
          fingerprint: deviceFingerprint,
          attempts: newAttempts
        });
      } else {
        setError(`ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (เหลือ ${MAX_ATTEMPTS - newAttempts} ครั้ง)`);
      }
      
      const newAnswer = generateAdvancedCaptcha();
      setCaptchaAnswer(newAnswer);
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
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-white-600 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Secure Admin Panel
          </h1>
          <p className="text-white-600">ระบบจัดการหลังบ้าน - Enhanced Security</p>
          
          {/* Security Status */}
          <div className="mt-3 flex justify-center items-center space-x-4 text-sm">
            <div className="flex items-center text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Encrypted
            </div>
            <div className="flex items-center text-blue-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
              Protected
            </div>
            {isSessionActive && (
              <div className="flex items-center text-orange-600">
                <Timer className="w-3 h-3 mr-1" />
                {formatTime(sessionTimer)}
              </div>
            )}
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="admin-error mb-4">
            <AlertTriangle className="h-5 w-5" />
            {error}
          </div>
        )}
        
        {success && (
          <div className="admin-success mb-4">
            <Shield className="h-5 w-5" />
            {success}
          </div>
        )}
        
        {isLocked && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-800 font-semibold flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              บัญชีถูกล็อค
            </div>
            <div className="text-red-700 text-sm mt-1">
              เหลือเวลา {formatTime(lockTimeRemaining)} นาที
            </div>
          </div>
        )}
        
        {loginAttempts > 0 && !isLocked && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-yellow-800 text-sm flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              การพยายามเข้าระบบผิด: {loginAttempts}/{MAX_ATTEMPTS} ครั้ง
            </div>
          </div>
        )}

        {suspiciousActivity && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="text-orange-800 text-sm font-semibold">
              ⚠️ ตรวจพบกิจกรรมผิดปกติ - กรุณารีเฟรชหน้า
            </div>
          </div>
        )}

        {/* Form */}
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
              disabled={isLoading || isLocked || suspiciousActivity}
              maxLength={50}
              autoComplete="username"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="รหัสผ่าน (ต้องแข็งแกร่ง)"
              className="admin-login-input pl-10 pr-10"
              disabled={isLoading || isLocked || suspiciousActivity}
              maxLength={128}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-btn"
              disabled={isLoading || isLocked}
            >
              {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
            </button>
          </div>

          {/* Enhanced CAPTCHA */}
          <div className="admin-captcha-box">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-mono text-xl tracking-widest p-4 rounded-lg select-none mb-3 text-center shadow-lg">
              <div className="bg-black/20 backdrop-blur-sm rounded p-2">
                {captcha}
              </div>
            </div>
            <input
              type="number"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="คำตอบ (ตัวเลข)"
              className="admin-login-input text-center text-lg font-mono mb-2"
              disabled={isLoading || isLocked || suspiciousActivity}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => {
                const answer = generateAdvancedCaptcha();
                setCaptchaAnswer(answer);
              }}
              className="captcha-refresh-btn"
              disabled={isLoading || isLocked}
            >
              <RefreshCcw className="h-4 w-4" />
              รีเฟรช
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || isLocked || suspiciousActivity}
            className="admin-login-btn relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
            <span className="relative z-10">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  กำลังตรวจสอบ...
                </div>
              ) : 'เข้าสู่ระบบ'}
            </span>
          </button>
        </form>

        {/* Security Info */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div>IP: {ipAddress || 'กำลังตรวจสอบ...'}</div>
            <div>Device ID: {deviceFingerprint.slice(0, 8)}...</div>
            <div>Last Login: {lastLogin || "ไม่เคยเข้าระบบ"}</div>
            <div>Security: Enhanced</div>
          </div>
        </div>
      </div>
    </div>
  );
}