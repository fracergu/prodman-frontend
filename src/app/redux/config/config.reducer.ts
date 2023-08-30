import { Action, createReducer, on } from '@ngrx/store'

import { ConfigActions } from './config.actions'
import { ConfigState, initialConfigState } from './config.state'

const _configReducer = createReducer(
  initialConfigState,
  on(ConfigActions.loadConfig, state => ({
    ...state,
    loading: true,
  })),
  on(ConfigActions.loadConfigSuccess, (state, { payload }) => ({
    ...state,
    config: payload,
    loading: false,
    loaded: true,
  })),
  on(ConfigActions.loadConfigFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(ConfigActions.updateConfig, state => ({
    ...state,
    loading: true,
  })),
  on(ConfigActions.updateConfigSuccess, (state, { payload }) => ({
    ...state,
    config: payload,
    loading: false,
    loaded: true,
  })),
  on(ConfigActions.updateConfigFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
)

export function configReducer(state: ConfigState | undefined, action: Action) {
  return _configReducer(state, action)
}
