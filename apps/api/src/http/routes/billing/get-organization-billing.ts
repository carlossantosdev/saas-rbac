import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function getOrganizationBilling(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/billing',
      {
        schema: {
          tags: ['billing'],
          summary: 'Get billing information from organization.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              billing: z.object({
                seats: z.object({
                  amount: z.number().int(),
                  unit: z.number().int(),
                  price: z.number(),
                }),
                projects: z.object({
                  amount: z.number().int(),
                  unit: z.number().int(),
                  price: z.number(),
                }),
                total: z.number().int(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'Billing')) {
          throw new UnauthorizedError(
            'You are not allowed to get billing details from this organization.',
          )
        }

        const [amountOfMembers, amountOfProjects] = await Promise.all([
          prisma.member.count({
            where: {
              organizationId: organization.id,
              role: { not: 'BILLING' },
            },
          }),

          prisma.project.count({
            where: {
              organizationId: organization.id,
            },
          }),
        ])

        const seatUnitValue = 10
        const projectUnitValue = 20

        return reply.status(200).send({
          billing: {
            seats: {
              amount: amountOfMembers,
              unit: seatUnitValue,
              price: amountOfMembers * seatUnitValue,
            },
            projects: {
              amount: amountOfProjects,
              unit: projectUnitValue,
              price: amountOfProjects * projectUnitValue,
            },
            total:
              amountOfMembers * seatUnitValue +
              amountOfProjects * projectUnitValue,
          },
        })
      },
    )
}
