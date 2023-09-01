import { USER_RESPONSE_MOCK } from '@mocks/user.mock'
import { UsersActions } from './users.actions'
import { usersReducer } from './users.reducer'
import { UsersState, initialUserState } from './users.state'
import { UserRequest } from '@shared/models/user-request.model'

describe('UsersReducer', () => {
  let initialState: UsersState

  const mockPaginatedResponse = {
    data: USER_RESPONSE_MOCK,
    nextPage: null,
    prevPage: null,
    total: 2,
  }

  const mockError = 'Some Error'

  const mockUserResponse = USER_RESPONSE_MOCK[0]

  const mockUserRequest: UserRequest = {
    name: 'John',
    lastName: 'Doe',
    username: 'johndoe',
  }

  beforeEach(() => {
    initialState = { ...initialUserState }
  })

  it('should return loading state after loadUsers action', () => {
    const newState = usersReducer(
      initialState,
      UsersActions.loadUsers({ params: { page: 1, limit: 2 } }),
    )
    expect(newState.loading).toBe(true)
    expect(newState.loaded).toBe(false)
  })

  it('should return loaded state and updated users after loadUsersSuccess action', () => {
    const newState = usersReducer(
      initialState,
      UsersActions.loadUsersSuccess(mockPaginatedResponse),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
    expect(newState.total).toEqual(mockPaginatedResponse.total)
  })

  it('should return error state after loadUsersFailure action', () => {
    const newState = usersReducer(
      initialState,
      UsersActions.loadUsersFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })

  it('should return loading state after createUser action', () => {
    const newState = usersReducer(
      initialState,
      UsersActions.createUser({ payload: mockUserRequest }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state after createUserSuccess action', () => {
    const newState = usersReducer(
      initialState,
      UsersActions.createUserSuccess(),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after createUserFailure action', () => {
    const newState = usersReducer(
      initialState,
      UsersActions.createUserFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })

  it('should return loading state after updateUser action', () => {
    const newState = usersReducer(
      initialState,
      UsersActions.updateUser({ payload: mockUserRequest }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state after updateUserSuccess action', () => {
    const newState = usersReducer(
      initialState,
      UsersActions.updateUserSuccess({ payload: mockUserResponse }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after updateUserFailure action', () => {
    const newState = usersReducer(
      initialState,
      UsersActions.updateUserFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })
})
