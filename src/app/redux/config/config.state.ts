import { AppConfigurationResponse } from '@shared/models/app-configuration-response.model'

export interface ConfigState {
  config?: AppConfigurationResponse
  loading: boolean
  loaded: boolean
  error?: string
}

export const initialConfigState: ConfigState = {
  loading: false,
  loaded: false,
}
