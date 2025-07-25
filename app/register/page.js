'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './styleRegister.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [gender, setGender] = useState('Male')
  const [agreed, setAgreed] = useState(false)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    if (!agreed) {
      alert("You must agree to the terms and conditions")
      return
    }

    // สมมติว่าสมัครสำเร็จ
    router.push('/login')
  }

  return (
    <div className="register-page">
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Create Account</h2>

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />

        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>I agree to the terms and conditions</span>
        </label>

        <button type="submit">Register</button>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
    </div>
  )
}
