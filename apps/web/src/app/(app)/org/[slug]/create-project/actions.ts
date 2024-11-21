'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createProjectRequest } from '@/http/requests/create-project'

const projectSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please, include at least 4 characters.' }),
  description: z.string(),
})

// export async function createProjectAction(_: unknown, data: FormData) {
export async function createProjectAction(data: FormData) {
  const validation = projectSchema.safeParse(Object.fromEntries(data))

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { name, description } = validation.data
  const currentOrg = await getCurrentOrg()
  try {
    await createProjectRequest({
      org: currentOrg!,
      name,
      description,
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

  return {
    success: true,
    message: 'Successfully saved the project.',
    errors: null,
  }
}
