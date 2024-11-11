import { api } from '@/http/api-client'
import type {
  SignInWithGithubBody,
  SignInWithGithubResponse200,
} from '@/http/types/sign-in-with-github'

export async function signInWithGithubRequest({ code }: SignInWithGithubBody) {
  const response = await api
    .post('sessions/github', {
      json: { code },
    })
    .json<SignInWithGithubResponse200>()

  return response
}
