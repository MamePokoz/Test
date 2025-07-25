<<<<<<< HEAD
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
=======
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
      <Navigation />
      <main>{children}</main>
      {!hideExtras && <Card />}
      {!hideExtras && <Footer />}
    </>
  )
}
>>>>>>> 9be121d1490086dfb5ca0046d9b9c4648191c034
