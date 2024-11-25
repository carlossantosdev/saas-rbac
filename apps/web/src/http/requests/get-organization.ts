import { api } from '@/http/api-client'
import type { GetOrganizationResponse200 } from '@/http/types/get-organization'

export async function getOrganization(org: string) {
  const response = await api
    .get(`organizations/${org}`)
    .json<GetOrganizationResponse200>()

  return response
}
