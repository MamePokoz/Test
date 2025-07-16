'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Carousel from './components/Carousel';

export default function Home() {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
  }

  return (
    <div>
      <Carousel />
    </div>
  )
}
