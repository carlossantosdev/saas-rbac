import { api } from '@/http/api-client'
import type { GetMembershipResponse200 } from '@/http/types/get-membership'

export async function getMembership(org: string) {
  const response = await api
    .get(`organizations/${org}/membership`)
    .json<GetMembershipResponse200>()

  return response
}
