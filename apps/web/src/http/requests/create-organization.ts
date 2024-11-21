import { api } from '@/http/api-client'
import type {
  CreateOrganizationBody,
  CreateOrganizationResponse200,
} from '@/http/types/create-organization'

export async function createOrganizationRequest({
  name,
  domain,
  shouldAttachUsersByDomain,
}: CreateOrganizationBody): Promise<CreateOrganizationResponse200> {
  await api.post('organizations', {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  })
}
