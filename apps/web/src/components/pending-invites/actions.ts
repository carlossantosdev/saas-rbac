'use server'

import { acceptInviteRequest } from '@/http/requests/accept-invite'
import { refuseInviteRequest } from '@/http/requests/refuse-invite'

export async function acceptInviteAction(inviteId: string) {
  await acceptInviteRequest(inviteId)
}

export async function refuseInviteAction(inviteId: string) {
  await refuseInviteRequest(inviteId)
}
