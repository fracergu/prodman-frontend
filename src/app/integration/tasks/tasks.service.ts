import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { PaginatedResponse } from '@shared/models/paginated-response'
import {
  TaskRequest,
  TasksSearchParameters,
} from '@shared/models/task-request.model'
import { TaskResponse } from '@shared/models/task-response.model'
import { httpParamsGenerator } from '@shared/utils/http-params-generator'
import { Observable } from 'rxjs'

import { Api } from '../api'
import { TasksServiceIntegrationApi } from './api'

@Injectable({
  providedIn: 'root',
})
export class TasksService implements TasksServiceIntegrationApi {
  constructor(
    private _api: Api,
    private _http: HttpClient,
  ) {}

  getTasks(
    params: TasksSearchParameters,
  ): Observable<PaginatedResponse<TaskResponse>> {
    return this._http.get<PaginatedResponse<TaskResponse>>(
      `${this._api.tasksUrl}`,
      {
        params: httpParamsGenerator(params),
      },
    )
  }
  createTask(task: TaskRequest): Observable<TaskResponse> {
    return this._http.post<TaskResponse>(`${this._api.tasksUrl}`, task)
  }
  updateTask(task: TaskRequest): Observable<TaskResponse> {
    return this._http.put<TaskResponse>(
      `${this._api.tasksUrl}/${task.id}`,
      task,
    )
  }
  deleteTask(id: number): Observable<void> {
    return this._http.delete<void>(`${this._api.tasksUrl}/${id}`)
  }
}
