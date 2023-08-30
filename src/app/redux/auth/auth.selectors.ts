import { createSelector } from '@ngrx/store'

import { AppState } from '../app.state'

export const selectAuthState = (state: AppState) => state.auth

export const selectAuthError = createSelector(
  selectAuthState,
  authState => authState.error,
)
