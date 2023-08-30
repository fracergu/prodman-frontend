import { ActiveWorkersResponse } from '@shared/models/active-workers-response'
import { CompleteSubtaskRequest } from '@shared/models/complete-subtask-request.model'
import { WorkerTaskResponse } from '@shared/models/worker-task-response'
import { Observable } from 'rxjs'

export interface WorkerServiceIntegrationApi {
  getTask(): Observable<WorkerTaskResponse>
  getActiveWorkers(): Observable<ActiveWorkersResponse>
  completeTask(data: CompleteSubtaskRequest): Observable<void>
}
