import {
  ACTIVE_WORKERS_RESPONSE_MOCK,
  WORKER_TASK_RESPONSE_MOCK,
} from '@mocks/worker.mock'
import { WorkerActions } from './worker.actions'
import { workerReducer } from './worker.reducer'
import { WorkerState, initialWorkerState } from './worker.state'
import { CompleteSubtaskRequest } from '@shared/models/complete-subtask-request.model'

describe('WorkerReducer', () => {
  let initialState: WorkerState

  const mockTask = WORKER_TASK_RESPONSE_MOCK
  const mockActiveWorkers = ACTIVE_WORKERS_RESPONSE_MOCK
  const mockError = 'Some Error'

  beforeEach(() => {
    initialState = { ...initialWorkerState }
  })

  it('should return loading state after loadTask action', () => {
    const newState = workerReducer(initialState, WorkerActions.loadTask())
    expect(newState.loading).toBe(true)
    expect(newState.loaded).toBe(false)
  })

  it('should return loaded state and task after loadTaskSuccess action', () => {
    const newState = workerReducer(
      initialState,
      WorkerActions.loadTaskSuccess({ payload: mockTask }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
    expect(newState.task).toEqual(mockTask)
  })

  it('should return error state after loadTaskFailure action', () => {
    const newState = workerReducer(
      initialState,
      WorkerActions.loadTaskFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })

  it('should return loading state after loadActiveWorkers action', () => {
    const newState = workerReducer(
      initialState,
      WorkerActions.loadActiveWorkers(),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state and active workers after loadActiveWorkersSuccess action', () => {
    const newState = workerReducer(
      initialState,
      WorkerActions.loadActiveWorkersSuccess({ payload: mockActiveWorkers }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
    expect(newState.activeWorkers).toEqual(mockActiveWorkers)
  })

  it('should return error state after loadActiveWorkersFailure action', () => {
    const newState = workerReducer(
      initialState,
      WorkerActions.loadActiveWorkersFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })

  it('should return loading state after completeTask action', () => {
    const completeSubtaskMock: CompleteSubtaskRequest = {
      id: 1,
      quantityCompleted: 1,
    }
    const newState = workerReducer(
      initialState,
      WorkerActions.completeTask({ payload: completeSubtaskMock }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state after completeTaskSuccess action', () => {
    const newState = workerReducer(
      initialState,
      WorkerActions.completeTaskSuccess(),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after completeTaskFailure action', () => {
    const newState = workerReducer(
      initialState,
      WorkerActions.completeTaskFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })
})
