import { api } from '@/http/api-client'
import type { GetBillingResponse200 } from '@/http/types/get-billing'

export async function getBilling(org: string) {
  const response = await api
    .get(`organizations/${org}/billing`)
    .json<GetBillingResponse200>()

  return response
}
