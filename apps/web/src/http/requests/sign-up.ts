import { api } from '@/http/api-client'
import type { SignUpBody, SignUpResponse200 } from '@/http/types/sign-up'

export async function signUpRequest({
  name,
  email,
  password,
}: SignUpBody): Promise<SignUpResponse200> {
  await api.post('users', {
    json: {
      name,
      email,
      password,
    },
  })
}
