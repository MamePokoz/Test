'use client';
import './stylelogin.css';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './global.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ ข้อมูล Admin (local login)
    const adminUser = {
      username: 'admin',
      password: 'admin123',
      fullname: 'Admin',
      role: 'admin',
    };

    try {
      if (!username || !password) {
        Swal.fire({
          icon: 'error',
          title: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน',
        });
        return;
      }

      // 🔹 ถ้าเป็น Admin
      if (username === adminUser.username && password === adminUser.password) {
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem(
          'user',
          JSON.stringify({
            username: adminUser.username,
            fullname: adminUser.fullname,
            role: adminUser.role,
          })
        );

        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ (Admin)',
          text: `ยินดีต้อนรับ ${adminUser.fullname}`,
        }).then(() => {
          router.push('/');
        });
        return;
      }
    // ✅ ข้อมูลผู้ใช้ Local (จำลอง DB)
    const localUsers = [
      {
        username: 'Fang',
        password: '123456',
        fullname: 'Supalerk Audomkasop',
        role: 'student',
      },
      {
        username: 'Teacher',
        password: '123',
        fullname: 'อาจารย์',
        role: 'teacher',
      },
    ];
          const foundUser = localUsers.find(
        (u) => u.username === username && u.password === password
      );
      
        if (foundUser) {
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: foundUser.username,
          fullname: foundUser.fullname,
          role: foundUser.role,
        })
      );

      Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
        text: `ยินดีต้อนรับ ${foundUser.fullname}`,
      }).then(() => {
        router.push('/');
      });
      return;
    }

      // 🔹 ยิง API ไป Backend
      const res = await fetch('http://itdev.cmtc.ac.th:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok && data.token) {
        // เก็บ token และข้อมูล user
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          text: `ยินดีต้อนรับ ${data.user?.fullname || username}`,
        }).then(() => {
          router.push('/');
        });
      } else {
        // แสดง error จาก backend ถ้ามี
        Swal.fire({
          icon: 'error',
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          text:
            data?.message ||
            data?.error ||
            'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
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
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
