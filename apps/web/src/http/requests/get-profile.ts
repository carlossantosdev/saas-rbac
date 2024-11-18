import { api } from '@/http/api-client'
import type { GetProfileResponse200 } from '@/http/types/get-profile'

export async function getProfile() {
  const response = await api.get('profile').json<GetProfileResponse200>()

  return response
}
