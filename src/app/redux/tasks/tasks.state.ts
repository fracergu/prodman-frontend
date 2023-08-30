import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { TaskResponse } from '@shared/models/task.model'

export interface TasksState extends EntityState<TaskResponse> {
  nextPage?: number | null
  prevPage?: number | null
  total?: number
  loading: boolean
  loaded: boolean
  error?: string
}

export const tasksAdapter: EntityAdapter<TaskResponse> =
  createEntityAdapter<TaskResponse>({
    selectId: (task: TaskResponse) => task.id,
  })

export const initialTasksState: TasksState = tasksAdapter.getInitialState({
  loading: false,
  loaded: false,
})
