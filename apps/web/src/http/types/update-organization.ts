export interface UpdateOrganizationBody {
  org: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

export type UpdateOrganizationResponse200 = void
