import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/requests/get-profile'

export async function isAuthenticated() {
  const cookiesStorage = await cookies()
  return !!cookiesStorage.get('token')?.value
}

export async function auth() {
  const cookiesStorage = await cookies()
  const token = cookiesStorage.get('token')?.value

  if (!token) {
    redirect('auth/sign-in')
  }

  try {
    const { user } = await getProfile()
    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
