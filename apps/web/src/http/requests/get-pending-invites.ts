import { api } from '@/http/api-client'
import type { GetPendingInvitesResponse200 } from '@/http/types/get-pending-invites'

export async function getPendingInvites() {
  const response = await api
    .get('pending-invites')
    .json<GetPendingInvitesResponse200>()

  return response
}
