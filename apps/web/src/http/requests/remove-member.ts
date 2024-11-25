import { api } from '@/http/api-client'
import type { RemoveMemberBody } from '@/http/types/remove-member'

export async function removeMemberRequest({ org, memberId }: RemoveMemberBody) {
  await api.delete(`organizations/${org}/members/${memberId}`)
}
