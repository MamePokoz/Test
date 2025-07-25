'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Footer from './Footer'
import Card from './Card'

export default function ClientWrapper({ children }) {
  const pathname = usePathname()
  const hideExtras = pathname === '/login' || pathname === '/register'

  return (
    <>
      {!hideExtras && <Navigation />}
      <main>{children}</main>
      {!hideExtras && <Card />}
      {!hideExtras && <Footer />}
    </>
  )
}
