import { components } from '@integration/api-schemas'

export interface TasksSearchParameters {
  page: number
  limit: number
  status?: string
  fromDate?: Date
  userId?: number
}

export type TaskRequest = components['schemas']['TaskCreationRequest'] & {
  id?: number
}
