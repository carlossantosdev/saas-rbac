export interface GetProjectsResponse200 {
  projects: {
    id: string
    name: string
    slug: string
    description: string
    avatarUrl: string | null
    organizationId: string
    ownerId: string
    createdAt: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }[]
}
