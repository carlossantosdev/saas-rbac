import { api } from '@/http/api-client'
import type {
  UpdateOrganizationBody,
  UpdateOrganizationResponse200,
} from '@/http/types/update-organization'

export async function updateOrganizationRequest({
  org,
  name,
  domain,
  shouldAttachUsersByDomain,
}: UpdateOrganizationBody): Promise<UpdateOrganizationResponse200> {
  await api.put(`organizations/${org}`, {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  })
}
