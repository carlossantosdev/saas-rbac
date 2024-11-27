import { api } from '@/http/api-client'
import type {
  CreateInviteBody,
  CreateInviteResponse200,
} from '@/http/types/create-invite'

export async function createInviteRequest({
  org,
  email,
  role,
}: CreateInviteBody): Promise<CreateInviteResponse200> {
  await api.post(`organizations/${org}/invites`, {
    json: {
      email,
      role,
    },
  })
}
