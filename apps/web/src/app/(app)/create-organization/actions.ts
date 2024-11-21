'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createOrganizationRequest } from '@/http/requests/create-organization'

const organizationSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Please, include at least 4 characters.' }),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex = /^[\w-]+\.[\w]{2,}$/

            return domainRegex.test(value)
          }

          return true
        },
        { message: 'Please, enter a valid domain.' },
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    (data) => {
      return !(data.shouldAttachUsersByDomain === true && !data.domain)
    },
    {
      message: 'Domain is required when auto-join is selected.',
      path: ['domain'],
    },
  )

// export async function createOrganizationAction(_: unknown, data: FormData) {
export async function createOrganizationAction(data: FormData) {
  const validation = organizationSchema.safeParse(Object.fromEntries(data))

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { name, domain, shouldAttachUsersByDomain } = validation.data

  try {
    await createOrganizationRequest({
      name,
      domain,
      shouldAttachUsersByDomain,
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
    message: 'Successfully saved the organization.',
    errors: null,
  }
}
