import type { Role } from '@saas/auth'

export interface GetMembersResponse200 {
  members: {
    userId: string
    id: string
    role: Role
    name: string | null
    avatarUrl: string | null
    email: string
  }[]
}
