import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import type { User } from './models/User'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  MEMBER(_, { can }) {
    // can('invite', 'User')
    can('manage', 'Project')
    can('transfer_ownership', 'Organization')
  },
  BILLING() {},
}
