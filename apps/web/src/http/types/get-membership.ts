import { Role } from '@saas/auth'

export interface GetMembershipResponse200 {
  membership: {
    id: string
    role: Role
    userId: string
    organizationId: string
  }
}
