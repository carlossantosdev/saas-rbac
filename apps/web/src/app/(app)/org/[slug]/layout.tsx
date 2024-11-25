import { redirect } from 'next/navigation'

import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="space-y-4 py-4">
      <div>
        <Header />
        <Tabs />
      </div>

      <main className="mx-auto w-full max-w-[1200px]">{children}</main>
    </div>
  )
}
