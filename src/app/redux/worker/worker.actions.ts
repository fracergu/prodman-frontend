import { createAction, props } from '@ngrx/store'
import { ActiveWorkersResponse } from '@shared/models/active-workers-response'
import { CompleteSubtaskRequest } from '@shared/models/complete-subtask-request.model'
import { WorkerTaskResponse } from '@shared/models/worker-task-response'

export enum WorkerActionType {
  LOAD_TASK = '[Worker] Load Task',
  LOAD_TASK_SUCCESS = '[Worker] Load Task Success',
  LOAD_TASK_FAILURE = '[Worker] Load Task Failure',

  LOAD_ACTIVE_WORKERS = '[Worker] Load Active Workers',
  LOAD_ACTIVE_WORKERS_SUCCESS = '[Worker] Load Active Workers Success',
  LOAD_ACTIVE_WORKERS_FAILURE = '[Worker] Load Active Workers Failure',

  COMPLETE_TASK = '[Worker] Complete Task',
  COMPLETE_TASK_SUCCESS = '[Worker] Complete Task Success',
  COMPLETE_TASK_FAILURE = '[Worker] Complete Task Failure',
}

export const loadTask = createAction(WorkerActionType.LOAD_TASK)

export const loadTaskSuccess = createAction(
  WorkerActionType.LOAD_TASK_SUCCESS,
  props<{ payload: WorkerTaskResponse }>(),
)

export const loadTaskFailure = createAction(
  WorkerActionType.LOAD_TASK_FAILURE,
  props<{ error: string }>(),
)

export const loadActiveWorkers = createAction(
  WorkerActionType.LOAD_ACTIVE_WORKERS,
)

export const loadActiveWorkersSuccess = createAction(
  WorkerActionType.LOAD_ACTIVE_WORKERS_SUCCESS,
  props<{ payload: ActiveWorkersResponse }>(),
)

export const loadActiveWorkersFailure = createAction(
  WorkerActionType.LOAD_ACTIVE_WORKERS_FAILURE,
  props<{ error: string }>(),
)

export const completeTask = createAction(
  WorkerActionType.COMPLETE_TASK,
  props<{ payload: CompleteSubtaskRequest }>(),
)

export const completeTaskSuccess = createAction(
  WorkerActionType.COMPLETE_TASK_SUCCESS,
)

export const completeTaskFailure = createAction(
  WorkerActionType.COMPLETE_TASK_FAILURE,
  props<{ error: string }>(),
)

export const WorkerActions = {
  loadTask,
  loadTaskSuccess,
  loadTaskFailure,
  loadActiveWorkers,
  loadActiveWorkersSuccess,
  loadActiveWorkersFailure,
  completeTask,
  completeTaskSuccess,
  completeTaskFailure,
}
