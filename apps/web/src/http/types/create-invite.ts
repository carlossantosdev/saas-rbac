import type { Role } from '@saas/auth'

export interface CreateInviteBody {
  org: string
  email: string
  role: Role
}

export type CreateInviteResponse200 = void
