import { createSelector } from '@ngrx/store'

import { AppState } from '../app.state'
import { tasksAdapter } from './tasks.state'

export const selectTasksState = (state: AppState) => state.tasks

const { selectAll } = tasksAdapter.getSelectors()

export const selectTasks = createSelector(selectTasksState, selectAll)

export const selectTasksLoading = createSelector(
  selectTasksState,
  tasksState => tasksState.loading,
)

export const selectTasksLoaded = createSelector(
  selectTasksState,
  tasksState => tasksState.loaded,
)

export const selectTasksError = createSelector(
  selectTasksState,
  tasksState => tasksState.error,
)

export const selectTasksNextPage = createSelector(
  selectTasksState,
  tasksState => tasksState.nextPage,
)

export const selectTasksPrevPage = createSelector(
  selectTasksState,
  tasksState => tasksState.prevPage,
)

export const selectTasksTotalItems = createSelector(
  selectTasksState,
  tasksState => tasksState.total,
)
