import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import type { User } from './models/User'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

type Role = 'ADMIN' | 'MEMBER'

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  MEMBER(_, { can }) {
    can('invite', 'User')
    can('manage', 'Project')
  },
}
