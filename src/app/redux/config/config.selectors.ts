import { createSelector } from '@ngrx/store'

import { AppState } from '../app.state'

export const selectConfigState = (state: AppState) => state.config

export const selectConfig = createSelector(
  selectConfigState,
  configState => configState.config,
)

export const selectConfigLoading = createSelector(
  selectConfigState,
  configState => configState.loading,
)

export const selectConfigLoaded = createSelector(
  selectConfigState,
  configState => configState.loaded,
)

export const selectConfigError = createSelector(
  selectConfigState,
  configState => configState.error,
)
