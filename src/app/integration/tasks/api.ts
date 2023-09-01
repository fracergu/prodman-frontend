import { PaginatedResponse } from '@shared/models/paginated-response'
import {
  TaskRequest,
  TasksSearchParameters,
} from '@shared/models/task-request.model'
import { TaskResponse } from '@shared/models/task-response.model'
import { Observable } from 'rxjs'

export interface TasksServiceIntegrationApi {
  getTasks(
    params: TasksSearchParameters,
  ): Observable<PaginatedResponse<TaskResponse>>
  createTask(task: TaskRequest): Observable<TaskResponse>
  updateTask(task: TaskRequest): Observable<TaskResponse>
  deleteTask(id: number): Observable<void>
}
