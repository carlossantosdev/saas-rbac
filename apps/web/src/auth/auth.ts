import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/requests/get-membership'
import { getProfile } from '@/http/requests/get-profile'

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

export async function getCurrentOrg() {
  const cookiesStore = await cookies()
  return cookiesStore.get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)
  return membership
}

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
