import { components } from '@integration/api-schemas'

export type CompleteSubtaskRequest =
  components['schemas']['CompleteSubtaskRequest'] & {
    id?: number
  }
