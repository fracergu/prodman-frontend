import { TASK_RESPONSE_MOCK } from '@mocks/task.mock'
import { TasksActions } from './tasks.actions'
import { tasksReducer } from './tasks.reducer'
import { TasksState, initialTasksState } from './tasks.state'

describe('TasksReducer', () => {
  let initialState: TasksState

  const mockPaginatedResponse = {
    data: TASK_RESPONSE_MOCK,
    nextPage: null,
    prevPage: null,
    total: 0,
  }

  const mockError = 'Some Error'

  const mockTaskResponse = TASK_RESPONSE_MOCK[0]

  beforeEach(() => {
    initialState = { ...initialTasksState }
  })

  it('should return loading state after loadTasks action', () => {
    const newState = tasksReducer(
      initialState,
      TasksActions.loadTasks({ params: { page: 1, limit: 2 } }),
    )
    expect(newState.loading).toBe(true)
    expect(newState.loaded).toBe(false)
  })

  it('should return loaded state and updated tasks after loadTasksSuccess action', () => {
    const newState = tasksReducer(
      initialState,
      TasksActions.loadTasksSuccess(mockPaginatedResponse),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
    expect(newState.total).toEqual(mockPaginatedResponse.total)
  })

  it('should return error state after loadTasksFailure action', () => {
    const newState = tasksReducer(
      initialState,
      TasksActions.loadTasksFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })

  it('should return loading state after createTask action', () => {
    const newState = tasksReducer(
      initialState,
      TasksActions.createTask({ payload: mockTaskResponse }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state after createTaskSuccess action', () => {
    const newState = tasksReducer(
      initialState,
      TasksActions.createTaskSuccess(),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after createTaskFailure action', () => {
    const newState = tasksReducer(
      initialState,
      TasksActions.createTaskFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })

  it('should return loading state after updateTask action', () => {
    const newState = tasksReducer(
      initialState,
      TasksActions.updateTask({ payload: mockTaskResponse }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state after updateTaskSuccess action', () => {
    const newState = tasksReducer(
      initialState,
      TasksActions.updateTaskSuccess({ payload: mockTaskResponse }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after updateTaskFailure action', () => {
    const newState = tasksReducer(
      initialState,
      TasksActions.updateTaskFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })

  it('should return loading state after deleteTask action', () => {
    const newState = tasksReducer(
      initialState,
      TasksActions.deleteTask({ id: 1 }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state after deleteTaskSuccess action', () => {
    const newState = tasksReducer(
      initialState,
      TasksActions.deleteTaskSuccess({ id: 1 }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after deleteTaskFailure action', () => {
    const newState = tasksReducer(
      initialState,
      TasksActions.deleteTaskFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })
})
