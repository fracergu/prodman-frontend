import { Action, createReducer, on } from '@ngrx/store'

import { WorkerActions } from './worker.actions'
import { initialWorkerState, WorkerState } from './worker.state'

const _workerReducer = createReducer(
  initialWorkerState,
  on(WorkerActions.loadTask, state => ({
    ...state,
    loading: true,
  })),
  on(WorkerActions.loadTaskSuccess, (state, { payload }) => ({
    ...state,
    task: payload,
    loading: false,
    loaded: true,
  })),
  on(WorkerActions.loadTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(WorkerActions.loadActiveWorkers, state => ({
    ...state,
    loading: true,
  })),
  on(WorkerActions.loadActiveWorkersSuccess, (state, { payload }) => ({
    ...state,
    activeWorkers: payload,
    loading: false,
    loaded: true,
  })),
  on(WorkerActions.loadActiveWorkersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(WorkerActions.completeTask, state => ({
    ...state,
    loading: true,
  })),
  on(WorkerActions.completeTaskSuccess, state => ({
    ...state,
    loading: false,
    loaded: true,
  })),
  on(WorkerActions.completeTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
)

export function workerReducer(state: WorkerState | undefined, action: Action) {
  return _workerReducer(state, action)
}
