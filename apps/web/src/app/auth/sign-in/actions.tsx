'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { signInWithPasswordRequest } from '@/http/requests/sign-in-with-password-request'

const signInWithPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

// export async function signInWithPasswordAction(_: unknown, data: FormData) {
export async function signInWithPasswordAction(data: FormData) {
  const validation = signInWithPasswordSchema.safeParse(
    Object.fromEntries(data),
  )

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { email, password } = validation.data

  try {
    const { token } = await signInWithPasswordRequest({
      email,
      password,
    })

    ;(await cookies()).set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }

    console.error(err)
    return {
      success: false,
      message: 'Unexpected error. Try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
