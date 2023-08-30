import { Action, createReducer, on } from '@ngrx/store'

import { AuthActions } from './auth.actions'
import { AuthState, initialAuthState } from './auth.state'

const _authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(AuthActions.loginSuccess, state => ({
    ...state,
    loading: false,
    loaded: true,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(AuthActions.logout, state => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(AuthActions.logoutSuccess, () => initialAuthState),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(AuthActions.register, state => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(AuthActions.registerSuccess, state => ({
    ...state,
    loading: false,
    loaded: true,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(AuthActions.checkSession, state => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(AuthActions.checkSessionSuccess, state => ({
    ...state,
    loading: false,
    loaded: true,
  })),
  on(AuthActions.checkSessionFailure, state => ({
    ...state,
    loading: false,
    loaded: false,
  })),
)

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action)
}
