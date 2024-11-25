import { api } from '@/http/api-client'
import type { ShutdownOrganizationBody } from '@/http/types/shutdown-organization'

export async function shutdownOrganizationRequest({
  org,
}: ShutdownOrganizationBody) {
  await api.delete(`organizations/${org}`)
}
