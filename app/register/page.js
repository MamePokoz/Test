'use client'

import { useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import './styleRegister.css'

export default function Register() {
  const [firstname, setFirstname] = useState('')
  const [fullname, setFullname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [sex, setSex] = useState('')
  const [birthday, setBirthday] = useState('')
  const [agreed, setAgreed] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'รหัสผ่านไม่ตรงกัน',
        text: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
      })
      return
    }

    if (!agreed) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณายอมรับเงื่อนไข',
        text: 'คุณต้องยอมรับเงื่อนไขก่อนสมัครสมาชิก',
      })
      return
    }

    try {
      const res = await fetch('https://backend-nextjs-virid.vercel.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          fullname,
          username,
          password,
          address,
          sex,
          birthday,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'สมัครสมาชิกสำเร็จ',
          text: 'คุณสามารถเข้าสู่ระบบได้แล้ว',
        })

        // Reset
        setFirstname('')
        setFullname('')
        setLastname('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setAddress('')
        setSex('')
        setBirthday('')
        setAgreed(false)

        router.push('/login')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: data.message || 'ไม่สามารถสมัครสมาชิกได้',
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อผิดพลาดเครือข่าย',
        text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
      })
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2 className="form-title">Create Account</h2>

          <select value={firstname} onChange={(e) => setFirstname(e.target.value)} required>
            <option value="" disabled hidden>Select Firstname</option>
            <option value="Mr.">Mr.</option>
            <option value="Ms.">Ms.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <select value={sex} onChange={(e) => setSex(e.target.value)} required>
            <option value="" disabled hidden>Select sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />

          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>I agree to the terms and conditions</span>
          </label>

          <button type="submit">Register</button>

          <p className="login-text">
            Already have an account?{" "}
            <a onClick={() => router.push("/login")} className="login-link">
            Login
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}
