import { api } from '@/http/api-client'
import type { GetInvitesResponse200 } from '@/http/types/get-invites'

export async function getInvitesRequest(orgSlug: string) {
  const response = await api
    .get(`organizations/${orgSlug}/invites`)
    .json<GetInvitesResponse200>()

  return response
}
