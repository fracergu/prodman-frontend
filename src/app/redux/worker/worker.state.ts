import { ActiveWorkersResponse } from '@shared/models/active-workers-response'
import { WorkerTaskResponse } from '@shared/models/worker-task-response'

export interface WorkerState {
  task?: WorkerTaskResponse
  activeWorkers: ActiveWorkersResponse
  loading: boolean
  loaded: boolean
  error?: string
}

export const initialWorkerState: WorkerState = {
  activeWorkers: [],
  loading: false,
  loaded: false,
}
