import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import type { User } from './models/User'
import { permissions } from './permissions'
import {
  billingSubject,
  bossSubject,
  inviteSubject,
  organizationSubject,
  projectSubject,
  userSubject,
} from './subjects'

const appAbilitiesSchema = z.union([
  billingSubject,
  bossSubject,
  inviteSubject,
  organizationSubject,
  projectSubject,
  userSubject,
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found.`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build()
  return ability
}
