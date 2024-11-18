'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUpRequest } from '@/http/requests/sign-up'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, enter your full name',
    }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: 'Password should have at least 6 characters.' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match.',
    path: ['password_confirmation'],
  })

// export async function signUpAction(_: unknown, data: FormData) {
export async function signUpAction(data: FormData) {
  const validation = signUpSchema.safeParse(Object.fromEntries(data))

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { name, email, password } = validation.data

  try {
    await signUpRequest({
      name,
      email,
      password,
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
