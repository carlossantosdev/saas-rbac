import { api } from '@/http/api-client'
import type { GetInviteResponse200 } from '@/http/types/get-invite'

export async function getInviteRequest(inviteId: string) {
  const response = await api
    .get(`invites/${inviteId}`)
    .json<GetInviteResponse200>()

  return response
}
