import { PaginatedResponse } from '@shared/models/paginated-response'
import { TaskResponse, TasksSearchParameters } from '@shared/models/task.model'
import { TaskRequest } from '@shared/models/task-request.model'
import { Observable } from 'rxjs'

export interface TasksServiceIntegrationApi {
  getTasks(
    params: TasksSearchParameters,
  ): Observable<PaginatedResponse<TaskResponse>>
  getTask(id: number): Observable<TaskResponse>
  createTask(task: TaskRequest): Observable<TaskResponse>
  updateTask(task: TaskRequest): Observable<TaskResponse>
  deleteTask(id: number): Observable<void>
}
