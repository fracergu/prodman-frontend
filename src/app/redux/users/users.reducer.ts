import { Action, createReducer, on } from '@ngrx/store'
import { PaginatedResponse } from '@shared/models/paginated-response'
import { UserResponse } from '@shared/models/user-response.model'

import { UsersActions } from './users.actions'
import { initialUserState, usersAdapter, UsersState } from './users.state'

const _usersReducer = createReducer(
  initialUserState,
  on(UsersActions.loadUsers, state => ({
    ...state,
    loading: true,
  })),
  on(UsersActions.loadUsersSuccess, _loadUsersSucces),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(UsersActions.createUser, state => ({
    ...state,
    loading: true,
  })),
  on(UsersActions.createUserSuccess, state => ({
    ...state,
    loading: false,
    loaded: true,
  })),
  on(UsersActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(UsersActions.updateUser, state => ({
    ...state,
    loading: true,
  })),
  on(UsersActions.updateUserSuccess, (state, { payload }) => ({
    ...usersAdapter.updateOne({ id: payload.id, changes: payload }, state),
    loading: false,
    loaded: true,
  })),
  on(UsersActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
)

function _loadUsersSucces(
  state: UsersState,
  data: PaginatedResponse<UserResponse>,
): UsersState {
  const { data: users, nextPage, prevPage, total } = data
  const newState = {
    ...usersAdapter.setAll(users, state),
    nextPage,
    prevPage,
    total,
    loading: false,
    loaded: true,
  }
  return newState
}

export function usersReducer(state: UsersState | undefined, action: Action) {
  return _usersReducer(state, action)
}
