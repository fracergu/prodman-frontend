import { createSelector } from '@ngrx/store'

import { AppState } from '../app.state'

export const selectWorkerState = (state: AppState) => state.worker

export const selectWorkerTask = createSelector(
  selectWorkerState,
  workerState => workerState.task,
)

export const selectActiveWorkers = createSelector(
  selectWorkerState,
  workerState => workerState.activeWorkers,
)

export const selectWorkerLoading = createSelector(
  selectWorkerState,
  workerState => workerState.loading,
)

export const selectWorkerLoaded = createSelector(
  selectWorkerState,
  workerState => workerState.loaded,
)

export const selectWorkerError = createSelector(
  selectWorkerState,
  workerState => workerState.error,
)
