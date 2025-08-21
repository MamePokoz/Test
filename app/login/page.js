'use client';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // ✅ ข้อมูล Admin (local login)
    const adminUser = {
      username: "admin",
      password: "admin123",
      fullname: "Admin",
      role: "admin",
    };
    // ✅ ข้อมูลผู้ใช้ Local (จำลอง DB)
    const localUsers = [
      {
        username: "Fang",
        password: "123456",
        fullname: "Supalerk Audomkasop",
        role: "student",
      },
      {
        username: "Teacher",
        password: "123",
        fullname: "อาจารย์",
        role: "teacher",
      },
    ];

    try {
      if (!username || !password) {
        Swal.fire({
          icon: "error",
          title: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน",
        });
        setIsLoading(false);
        return;
      }

      // 🔹 ถ้าเป็น Admin
      if (username === adminUser.username && password === adminUser.password) {
        localStorage.setItem("token", "dummy-token");
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: adminUser.username,
            fullname: adminUser.fullname,
            role: adminUser.role,
          })
        );

        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ (Admin)",
          text: `ยินดีต้อนรับ ${adminUser.fullname}`,
        }).then(() => {
          router.push("/");
        });
        setIsLoading(false);
        return;
      }

      const foundUser = localUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        localStorage.setItem("token", "dummy-token");
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: foundUser.username,
            fullname: foundUser.fullname,
            role: foundUser.role,
          })
        );

        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          text: `ยินดีต้อนรับ ${foundUser.fullname}`,
        }).then(() => {
          router.push("/");
        });
        setIsLoading(false);
        return;
      }

      // 🔹 ยิง API ไป Backend
      const res = await fetch(
        "https://backend-nextjs-virid.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok && data.token) {
        // เก็บ token และข้อมูล user
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          text: `ยินดีต้อนรับ ${data.user?.fullname || username}`,
        }).then(() => {
          router.push("/");
        });
      } else {
        // แสดง error จาก backend ถ้ามี
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text:
            data?.message || data?.error || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาดเครือข่าย",
        text: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginWrapper}>
          {/* Header Section */}
          <div className={styles.headerSection}>
            <div className={styles.logoContainer}>
              <div className={styles.logoIcon}>⚽</div>
            </div>
            <h2 className={styles.formTitle}>¡Visca el Barça!</h2>
            <p className={styles.formSubtitle}>Més que un club - Sign in to continue</p>
          </div>

          {/* Demo Accounts Info */}
          <div className={styles.demoAccounts}>
            <h4>🏆 Demo Access:</h4>
            <div className={styles.demoList}>
              <div className={styles.demoItem}>
                <strong>🔴 Admin:</strong> admin / admin123
              </div>
              <div className={styles.demoItem}>
                <strong>⚽ student:</strong> Fang / 123456
              </div>
              <div className={styles.demoItem}>
                <strong>👔 Teacher:</strong> Teacher / 123
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>⚽ Username</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>👤</span>
                <input
                  type="text"
                  placeholder="Enter your Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={styles.textInput}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>🔐 Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.textInput}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className={styles.optionsRow}>
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxText}>Remember me</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Entering Camp Nou...
                </>
              ) : (
                <>
                  <span>⚽ Enter Camp Nou</span>
                  <span className={styles.buttonIcon}>🏟️</span>
                </>
              )}
            </button>

            <div className={styles.registerSection}>
              <p className={styles.registerText}>
                Dont have account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/register")} 
                  className={styles.registerLink}
                >
                  Join the Club! 🔴🔵
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}