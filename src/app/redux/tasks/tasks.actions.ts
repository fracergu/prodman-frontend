import { createAction, props } from '@ngrx/store'
import { PaginatedResponse } from '@shared/models/paginated-response'
import { TaskResponse, TasksSearchParameters } from '@shared/models/task.model'
import { TaskRequest } from '@shared/models/task-request.model'

export enum TasksActionType {
  LOAD_TASKS = '[Task] Load Tasks',
  LOAD_TASKS_SUCCESS = '[Task] Load Tasks Success',
  LOAD_TASKS_FAILURE = '[Task] Load Tasks Failure',

  CREATE_TASK = '[Task] Create Task',
  CREATE_TASK_SUCCESS = '[Task] Create Task Success',
  CREATE_TASK_FAILURE = '[Task] Create Task Failure',

  UPDATE_TASK = '[Task] Update Task',
  UPDATE_TASK_SUCCESS = '[Task] Update Task Success',
  UPDATE_TASK_FAILURE = '[Task] Update Task Failure',

  DELETE_TASK = '[Task] Delete Task',
  DELETE_TASK_SUCCESS = '[Task] Delete Task Success',
  DELETE_TASK_FAILURE = '[Task] Delete Task Failure',
}

export const loadTasks = createAction(
  TasksActionType.LOAD_TASKS,
  props<{ params: TasksSearchParameters }>(),
)

export const loadTasksSuccess = createAction(
  TasksActionType.LOAD_TASKS_SUCCESS,
  props<PaginatedResponse<TaskResponse>>(),
)

export const loadTasksFailure = createAction(
  TasksActionType.LOAD_TASKS_FAILURE,
  props<{ error: string }>(),
)

export const createTask = createAction(
  TasksActionType.CREATE_TASK,
  props<{ payload: TaskRequest }>(),
)

export const createTaskSuccess = createAction(
  TasksActionType.CREATE_TASK_SUCCESS,
)

export const createTaskFailure = createAction(
  TasksActionType.CREATE_TASK_FAILURE,
  props<{ error: string }>(),
)

export const updateTask = createAction(
  TasksActionType.UPDATE_TASK,
  props<{ payload: TaskRequest }>(),
)

export const updateTaskSuccess = createAction(
  TasksActionType.UPDATE_TASK_SUCCESS,
  props<{ payload: TaskResponse }>(),
)

export const updateTaskFailure = createAction(
  TasksActionType.UPDATE_TASK_FAILURE,
  props<{ error: string }>(),
)

export const deleteTask = createAction(
  TasksActionType.DELETE_TASK,
  props<{ id: number }>(),
)

export const deleteTaskSuccess = createAction(
  TasksActionType.DELETE_TASK_SUCCESS,
  props<{ id: number }>(),
)

export const deleteTaskFailure = createAction(
  TasksActionType.DELETE_TASK_FAILURE,
  props<{ error: string }>(),
)

export const TasksActions = {
  loadTasks,
  loadTasksSuccess,
  loadTasksFailure,
  createTask,
  createTaskSuccess,
  createTaskFailure,
  updateTask,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFailure,
}
