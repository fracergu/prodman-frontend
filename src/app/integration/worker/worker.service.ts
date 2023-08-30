import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ActiveWorkersResponse } from '@shared/models/active-workers-response'
import { CompleteSubtaskRequest } from '@shared/models/complete-subtask-request.model'
import { WorkerTaskResponse } from '@shared/models/worker-task-response'
import { Observable } from 'rxjs'

import { Api } from '../api'
import { WorkerServiceIntegrationApi } from './api'

@Injectable({
  providedIn: 'root',
})
export class WorkerService implements WorkerServiceIntegrationApi {
  constructor(
    private _api: Api,
    private _http: HttpClient,
  ) {}

  getTask(): Observable<WorkerTaskResponse> {
    return this._http.get<WorkerTaskResponse>(`${this._api.workerUrl}/task`)
  }

  getActiveWorkers(): Observable<ActiveWorkersResponse> {
    return this._http.get<ActiveWorkersResponse>(
      `${this._api.workerUrl}/active`,
    )
  }

  completeTask(data: CompleteSubtaskRequest): Observable<void> {
    const { id, quantityCompleted } = data
    return this._http.post<void>(
      `${this._api.workerUrl}/completeSubtask/${id}`,
      { quantityCompleted },
    )
  }
}
