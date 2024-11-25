import { api } from '@/http/api-client'
import type { GetMembersResponse200 } from '@/http/types/get-members'

export async function getMembers(org: string): Promise<GetMembersResponse200> {
  const response = await api
    .get(`organizations/${org}/members`)
    .json<GetMembersResponse200>()

  return response
}
