import { createAction, props } from '@ngrx/store'
import { AuthCredentials } from '@shared/models/auth-credentials.model'
import { RegisterRequest } from '@shared/models/register-request.model'

export enum LoginType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum AuthActionType {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  LOGOUT_SUCCESS = '[Auth] Logout Success',
  LOGOUT_FAILURE = '[Auth] Logout Failure',
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',
  CHECK_SESSION = '[Auth] Check Session',
  CHECK_SESSION_SUCCESS = '[Auth] Check Session Success',
  CHECK_SESSION_FAILURE = '[Auth] Check Session Failure',
}

export const login = createAction(
  AuthActionType.LOGIN,
  props<{
    credentials: AuthCredentials
    loginType: LoginType
    rememberMe?: boolean
  }>(),
)

export const loginSuccess = createAction(AuthActionType.LOGIN_SUCCESS)

export const loginFailure = createAction(
  AuthActionType.LOGIN_FAILURE,
  props<{ error: any }>(),
)

export const logout = createAction(AuthActionType.LOGOUT)

export const logoutSuccess = createAction(AuthActionType.LOGOUT_SUCCESS)

export const logoutFailure = createAction(
  AuthActionType.LOGOUT_FAILURE,
  props<{ error: any }>(),
)

export const register = createAction(
  AuthActionType.REGISTER,
  props<{ payload: RegisterRequest }>(),
)

export const registerSuccess = createAction(AuthActionType.REGISTER_SUCCESS)

export const registerFailure = createAction(
  AuthActionType.REGISTER_FAILURE,
  props<{ error: any }>(),
)

export const checkSession = createAction(AuthActionType.CHECK_SESSION)

export const checkSessionSuccess = createAction(
  AuthActionType.CHECK_SESSION_SUCCESS,
)

export const checkSessionFailure = createAction(
  AuthActionType.CHECK_SESSION_FAILURE,
)

export const AuthActions = {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  register,
  registerSuccess,
  registerFailure,
  checkSession,
  checkSessionSuccess,
  checkSessionFailure,
}
