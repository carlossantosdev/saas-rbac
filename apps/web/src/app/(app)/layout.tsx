import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

export default async function AppLayout({
  children,
  teste,
}: Readonly<{
  children: React.ReactNode
  teste: React.ReactNode
}>) {
  if (await !isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      {children}
      {teste}
    </>
  )
}
