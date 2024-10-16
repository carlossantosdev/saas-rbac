import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NextJS RBAC SaaS',
  description: 'SaaS with NextJS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
