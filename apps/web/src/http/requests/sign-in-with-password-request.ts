import { api } from '@/http/api-client'
import type {
  SignInWithPasswordBody,
  SignInWithPasswordResponse200,
} from '@/http/types/sign-in-with-password'

export async function signInWithPasswordRequest({
  email,
  password,
}: SignInWithPasswordBody) {
  const response = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithPasswordResponse200>()

  return response
}
