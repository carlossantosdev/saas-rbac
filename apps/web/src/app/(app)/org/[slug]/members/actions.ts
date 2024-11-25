'use server'

import { getCurrentOrg } from '@/auth/auth'
import { removeMemberRequest } from '@/http/requests/remove-member'

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg()
  await removeMemberRequest({ org: currentOrg!, memberId })
}
