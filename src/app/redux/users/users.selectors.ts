import { createSelector } from '@ngrx/store'

import { AppState } from '../app.state'
import { usersAdapter } from './users.state'

export const selectUsersState = (state: AppState) => state.users

const { selectAll, selectEntities } = usersAdapter.getSelectors()

export const selectUsers = createSelector(selectUsersState, selectAll)

export const selectEntity = (id: number) =>
  createSelector(selectEntities, entities => entities[id])

export const selectUsersLoading = createSelector(
  selectUsersState,
  usersState => usersState.loading,
)

export const selectUsersLoaded = createSelector(
  selectUsersState,
  usersState => usersState.loaded,
)

export const selectUsersError = createSelector(
  selectUsersState,
  usersState => usersState.error,
)

export const selectUsersNextPage = createSelector(
  selectUsersState,
  usersState => usersState.nextPage,
)

export const selectUsersPrevPage = createSelector(
  selectUsersState,
  usersState => usersState.prevPage,
)

export const selectUsersTotalItems = createSelector(
  selectUsersState,
  usersState => usersState.total,
)
