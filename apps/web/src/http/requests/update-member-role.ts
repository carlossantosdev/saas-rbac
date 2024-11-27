import { api } from '@/http/api-client'
import type { UpdateMemberRoleBody } from '@/http/types/update-member-role'

export async function updateMemberRoleRequest({
  org,
  memberId,
  role,
}: UpdateMemberRoleBody) {
  await api.put(`organizations/${org}/members/${memberId}`, {
    json: { role },
  })
}
