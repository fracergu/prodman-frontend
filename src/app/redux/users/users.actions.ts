import { createAction, props } from '@ngrx/store'
import { AuthCredentials } from '@shared/models/auth-credentials.model'
import { PaginatedResponse } from '@shared/models/paginated-response'
import {
  UserRequest,
  UserSearchParameters,
} from '@shared/models/user-request.model'
import { UserResponse } from '@shared/models/user-response.model'

export enum UsersActionType {
  LOAD_USERS = '[User] Load Users',
  LOAD_USERS_SUCCESS = '[User] Load Users Success',
  LOAD_USERS_FAILURE = '[User] Load Users Failure',

  CREATE_USER = '[User] Create User',
  CREATE_USER_SUCCESS = '[User] Create User Success',
  CREATE_USER_FAILURE = '[User] Create User Failure',

  UPDATE_USER = '[User] Update User',
  UPDATE_USER_SUCCESS = '[User] Update User Success',
  UPDATE_USER_FAILURE = '[User] Update User Failure',

  UPDATE_USER_CREDENTIALS = '[User] Update User Credentials',
  UPDATE_USER_CREDENTIALS_SUCCESS = '[User] Update User Credentials Success',
  UPDATE_USER_CREDENTIALS_FAILURE = '[User] Update User Credentials Failure',
}

export const loadUsers = createAction(
  UsersActionType.LOAD_USERS,
  props<{ params: UserSearchParameters }>(),
)

export const loadUsersSuccess = createAction(
  UsersActionType.LOAD_USERS_SUCCESS,
  props<PaginatedResponse<UserResponse>>(),
)

export const loadUsersFailure = createAction(
  UsersActionType.LOAD_USERS_FAILURE,
  props<{ error: string }>(),
)

export const createUser = createAction(
  UsersActionType.CREATE_USER,
  props<{ payload: UserRequest }>(),
)

export const createUserSuccess = createAction(
  UsersActionType.CREATE_USER_SUCCESS,
)

export const createUserFailure = createAction(
  UsersActionType.CREATE_USER_FAILURE,
  props<{ error: string }>(),
)

export const updateUser = createAction(
  UsersActionType.UPDATE_USER,
  props<{ payload: UserRequest }>(),
)

export const updateUserSuccess = createAction(
  UsersActionType.UPDATE_USER_SUCCESS,
  props<{ payload: UserResponse }>(),
)

export const updateUserFailure = createAction(
  UsersActionType.UPDATE_USER_FAILURE,
  props<{ error: string }>(),
)

export const updateUserCredentials = createAction(
  UsersActionType.UPDATE_USER_CREDENTIALS,
  props<{ id: number; credentials: AuthCredentials }>(),
)

export const updateUserCredentialsSuccess = createAction(
  UsersActionType.UPDATE_USER_CREDENTIALS_SUCCESS,
  props<{ payload: UserResponse }>(),
)

export const updateUserCredentialsFailure = createAction(
  UsersActionType.UPDATE_USER_CREDENTIALS_FAILURE,
  props<{ error: string }>(),
)

export const UsersActions = {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  createUser,
  createUserSuccess,
  createUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  updateUserCredentials,
  updateUserCredentialsSuccess,
  updateUserCredentialsFailure,
}
