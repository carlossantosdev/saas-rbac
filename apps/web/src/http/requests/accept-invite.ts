import { api } from '@/http/api-client'
import type { AcceptInviteResponse200 } from '@/http/types/accept-invite'

export async function acceptInviteRequest(
  inviteId: string,
): Promise<AcceptInviteResponse200> {
  await api.post(`invites/${inviteId}/accept`)
}
