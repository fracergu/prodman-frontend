import { components } from '@integration/api-schemas'

export type UserRequest = components['schemas']['UserCreationRequest'] & {
  id?: number
}

export interface UserSearchParameters {
  page: number
  limit: number
  search?: string
  role?: string
  inactive?: boolean
}
