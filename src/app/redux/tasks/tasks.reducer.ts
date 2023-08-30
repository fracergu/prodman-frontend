import { Action, createReducer, on } from '@ngrx/store'
import { PaginatedResponse } from '@shared/models/paginated-response'
import { TaskResponse } from '@shared/models/task.model'

import { TasksActions } from './tasks.actions'
import { initialTasksState, tasksAdapter, TasksState } from './tasks.state'

const _tasksReducer = createReducer(
  initialTasksState,
  on(TasksActions.loadTasks, state => ({
    ...state,
    loading: true,
  })),
  on(TasksActions.loadTasksSuccess, _loadTasksSucces),
  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(TasksActions.createTask, state => ({
    ...state,
    loading: true,
  })),
  on(TasksActions.createTaskSuccess, state => ({
    ...state,
    loading: false,
    loaded: true,
  })),
  on(TasksActions.createTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(TasksActions.updateTask, state => ({
    ...state,
    loading: true,
  })),
  on(TasksActions.updateTaskSuccess, (state, { payload }) => ({
    ...tasksAdapter.updateOne({ id: payload.id, changes: payload }, state),
    loading: false,
    loaded: true,
  })),
  on(TasksActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(TasksActions.deleteTask, state => ({
    ...state,
    loading: true,
  })),
  on(TasksActions.deleteTaskSuccess, (state, { id }) => ({
    ...tasksAdapter.removeOne(id, state),
    loading: false,
    loaded: true,
  })),
  on(TasksActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
)

function _loadTasksSucces(
  state: TasksState,
  data: PaginatedResponse<TaskResponse>,
) {
  return tasksAdapter.setAll(data.data, {
    ...state,
    loading: false,
    loaded: true,
    nextPage: data.nextPage,
    prevPage: data.prevPage,
    total: data.total,
  })
}

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return _tasksReducer(state, action)
}
