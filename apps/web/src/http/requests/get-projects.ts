import { api } from '@/http/api-client'
import type { GetProjectsResponse200 } from '@/http/types/get-projects'

export async function getProjects(orgSlug: string) {
  const response = await api
    .get(`organizations/${orgSlug}/projects`)
    .json<GetProjectsResponse200>()

  return response
}
