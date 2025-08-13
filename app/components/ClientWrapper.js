'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Footer from './Footer'
import Card from './Card'

export default function ClientWrapper({ children }) {
  const pathname = usePathname()

  const hideNavFooter = pathname === '/login' || pathname === '/register' 

  const hideCard = pathname === '/contact' || pathname === '/service' || pathname === '/about' || pathname === '/register' 
  || pathname === '/login'|| pathname.startsWith('/player/') || pathname === '/admin/users' || pathname.startsWith('/admin/users/edit/')


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
