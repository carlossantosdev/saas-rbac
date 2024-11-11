import Link from 'next/link'

import { auth } from '@/auth/auth'

export default async function Home() {
  const { user } = await auth()
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Link href="/auth/sign-in">Auth</Link>
    </div>
  )
}
