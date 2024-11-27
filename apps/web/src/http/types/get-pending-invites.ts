import type { Role } from '@saas/auth'

export interface GetPendingInvitesResponse200 {
  invites: {
    organization: {
      name: string
    }
    id: string
    email: string
    role: Role
    createdAt: string
    author: {
      name: string | null
      id: string
      avatarUrl: string | null
    } | null
  }[]
}
