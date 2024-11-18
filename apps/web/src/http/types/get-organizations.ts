export interface GetOrganizationsResponse200 {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
  }[]
}
