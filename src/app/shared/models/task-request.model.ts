import { components } from '@integration/api-schemas'

export type TaskRequest = components['schemas']['TaskCreationRequest'] & {
  id?: number
}
