import { api } from '@/http/api-client'
import type { RevokeInviteMemberBody } from '@/http/types/revoke-invite-member'

export async function revokeInviteRequest({
  org,
  inviteId,
}: RevokeInviteMemberBody) {
  await api.delete(`organizations/${org}/invites/${inviteId}`)
}
