import type { Role } from '@saas/auth'

export interface UpdateMemberRoleBody {
  org: string
  memberId: string
  role: Role
}
