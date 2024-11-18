import { api } from '@/http/api-client'
import type { GetOrganizationsResponse200 } from '@/http/types/get-organizations'

export async function getOrganizations() {
  const response = await api
    .get('organizations')
    .json<GetOrganizationsResponse200>()

  return response
}
