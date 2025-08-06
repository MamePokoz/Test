'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Footer from './Footer'
import Card from './Card'

export default function ClientWrapper({ children }) {
  const pathname = usePathname()

  // ซ่อน Navigation และ Footer เฉพาะหน้า login กับ register
  const hideNavFooter = pathname === '/login' || pathname === '/register' 

  // ซ่อน Card เฉพาะหน้า contact
  const hideCard = pathname === '/contact' || pathname === '/service' || pathname === '/about' || pathname === '/register' 
  || pathname === '/login'|| pathname.startsWith('/player/') || pathname === '/admin/users'


  const HideNav = pathname  === '/about'

  return (
    <>
      {!hideNavFooter && <Navigation />}
      <main>{children}</main>
      {!hideCard && <Card />}
      {!hideNavFooter && <Footer />}
    </>
  )
}
