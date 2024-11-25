import { api } from '@/http/api-client'
import type {
  CreateProjectBody,
  CreateProjectResponse200,
} from '@/http/types/create-project'

export async function createProjectRequest({
  org,
  name,
  description,
}: CreateProjectBody): Promise<CreateProjectResponse200> {
  await api.post(`organizations/${org}/projects`, {
    json: {
      name,
      description,
    },
  })
}
