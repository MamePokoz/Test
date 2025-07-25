'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './stylelogin.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false) // ✅ เพิ่มตรงนี้
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password && agreed) {
      router.push('/')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
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
  )
}
