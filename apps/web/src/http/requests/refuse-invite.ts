import { api } from '@/http/api-client'
import type { RefuseInviteResponse200 } from '@/http/types/refuse-invite'

export async function refuseInviteRequest(
  inviteId: string,
): Promise<RefuseInviteResponse200> {
  await api.post(`invites/${inviteId}/reject`)
}
