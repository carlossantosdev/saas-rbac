'use server'

import { type Role, roleSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createInviteRequest } from '@/http/requests/create-invite-request'
import { removeMemberRequest } from '@/http/requests/remove-member'
import { revokeInviteRequest } from '@/http/requests/revoke-invite-request'
import { updateMemberRoleRequest } from '@/http/requests/update-member-role'

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg()
  await removeMemberRequest({ org: currentOrg!, memberId })
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg()
  await updateMemberRoleRequest({ org: currentOrg!, memberId, role })
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrg()
  await revokeInviteRequest({ org: currentOrg!, inviteId })
}

const inviteSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail address.' }),
  role: roleSchema,
})

// export async function createProjectAction(_: unknown, data: FormData) {
export async function createInviteAction(data: FormData) {
  const validation = inviteSchema.safeParse(Object.fromEntries(data))

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { email, role } = validation.data
  const currentOrg = await getCurrentOrg()

  try {
    await createInviteRequest({
      org: currentOrg!,
      email,
      role,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }

    console.error(err)
    return {
      success: false,
      message: 'Unexpected error. Try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Invite sended with success.',
    errors: null,
  }
}
