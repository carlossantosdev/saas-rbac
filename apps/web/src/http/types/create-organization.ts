export interface CreateOrganizationBody {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

export type CreateOrganizationResponse200 = void
