'use client'

import { useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import styles from './Register.module.css'

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
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'รหัสผ่านไม่ตรงกัน',
        text: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
      })
      setIsLoading(false)
      return
    }

    if (!agreed) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณายอมรับเงื่อนไข',
        text: 'คุณต้องยอมรับเงื่อนไขก่อนสมัครสมาชิก',
      })
      setIsLoading(false)
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

        // Reset form
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <div className={styles.formWrapper}>
          <div className={styles.headerSection}>
            <h2 className={styles.formTitle}>Create Account</h2>
            <p className={styles.formSubtitle}>Join us and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.registerForm}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Title</label>
                <select 
                  value={firstname} 
                  onChange={(e) => setFirstname(e.target.value)} 
                  required
                  className={styles.selectInput}
                >
                  <option value="" disabled>Select Title</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                  className={styles.textInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  className={styles.textInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Username</label>
                <input
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={styles.textInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Password</label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.textInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={styles.textInput}
                />
              </div>

              <div className={styles.inputGroupFull}>
                <label className={styles.inputLabel}>Address</label>
                <textarea
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className={styles.textareaInput}
                  rows="3"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Gender</label>
                <select 
                  value={sex} 
                  onChange={(e) => setSex(e.target.value)} 
                  required
                  className={styles.selectInput}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Birthday</label>
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                  className={styles.dateInput}
                />
              </div>
            </div>

            <div className={styles.checkboxContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxText}>
                  I agree to the Terms and Conditions
                </span>
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
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <div className={styles.loginSection}>
              <p className={styles.loginText}>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")} 
                  className={styles.loginLink}
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}