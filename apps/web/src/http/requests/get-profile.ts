import { api } from '@/http/api-client'
import type { GetProfileResponseResponse200 } from '@/http/types/get-profile'

export async function getProfile() {
  const response = await api
    .get('profile')
    .json<GetProfileResponseResponse200>()

  return response
}
