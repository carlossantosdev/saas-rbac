import type { Role } from '@saas/auth'

export interface GetInvitesResponse200 {
  invites: {
    id: string
    role: Role
    email: string
    createdAt: string
    author: {
      id: string
      name: string | null
    } | null
  }[]
}
