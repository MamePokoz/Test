'use client';
import './stylelogin.css'; 
import Swal from 'sweetalert2'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './global.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      title: "Email ไม่ถูกต้อง",
      text: "กรุณาใส่อีเมลให้ถูกต้อง เช่น example@email.com",
      icon: "error",
      width: 600,
      padding: "3em",
    });
    return;
  }

      const adminUser = {
        email: 'admin@hotmail.com',
        password: 'admin123',
        fullname: 'Admin',
        role: 'admin',
      };

try {
    if (email && password) {
      if (email === adminUser.email && password === adminUser.password) {
        // ถ้าเป็น admin
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('user', JSON.stringify({
          email: adminUser.email,
          fullname: adminUser.fullname,
          role: adminUser.role,
        }));

        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ (Admin)',
          text: `ยินดีต้อนรับ ${adminUser.fullname}`,
        }).then(() => {
          router.push('/');
        });
      } else {
        // ผู้ใช้ทั่วไป
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('user', JSON.stringify({
          email,
          fullname: 'ผู้ใช้งานทั่วไป',
          role: 'user',
        }));

        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          text: `ยินดีต้อนรับ ${email}`,
        }).then(() => {
          router.push('/');
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกอีเมลและรหัสผ่าน',
      });
    }
    } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'ข้อผิดพลาดเครือข่าย',
          text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
        });
      }
    };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="form-title">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>Remember Me</span>
          </label>
          
          <button type="submit">Login</button>
          <p className="register-link">
            Don’t have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
