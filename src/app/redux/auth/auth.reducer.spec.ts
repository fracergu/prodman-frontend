import { AuthActions, LoginType } from './auth.actions'
import { authReducer } from './auth.reducer'
import { initialAuthState } from './auth.state'

describe('GIVEN: AuthReducer', () => {
  it('should return loading state after login action', () => {
    const newState = authReducer(
      initialAuthState,
      AuthActions.login({
        credentials: {
          username: 'username',
          password: 'password',
        },
        loginType: LoginType.ADMIN,
        rememberMe: true,
      }),
    )
    expect(newState.loading).toBe(true)
    expect(newState.loaded).toBe(false)
  })

  it('should return loaded state after login success action', () => {
    const newState = authReducer(initialAuthState, AuthActions.loginSuccess())
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after login failure action', () => {
    const newState = authReducer(
      initialAuthState,
      AuthActions.loginFailure({ error: 'Error' }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toBe('Error')
  })

  it('should return initial state after logout success action', () => {
    const newState = authReducer(initialAuthState, AuthActions.logoutSuccess())
    expect(newState).toEqual(initialAuthState)
  })

  it('should return error state after logout failure action', () => {
    const newState = authReducer(
      initialAuthState,
      AuthActions.logoutFailure({ error: 'Error' }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toBe('Error')
  })

  it('should return loading state after logout action', () => {
    const newState = authReducer(initialAuthState, AuthActions.logout())
    expect(newState.loading).toBe(true)
    expect(newState.loaded).toBe(false)
  })

  it('should return loading state after register action', () => {
    const newState = authReducer(
      initialAuthState,
      AuthActions.register({
        payload: {
          username: 'username',
          password: 'password',
          name: 'firstName',
          lastName: 'lastName',
        },
      }),
    )
    expect(newState.loading).toBe(true)
    expect(newState.loaded).toBe(false)
  })

  it('should return loaded state after register success action', () => {
    const newState = authReducer(
      initialAuthState,
      AuthActions.registerSuccess(),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after register failure action', () => {
    const newState = authReducer(
      initialAuthState,
      AuthActions.registerFailure({ error: 'Error' }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toBe('Error')
  })

  it('should return loading state after checkSession action', () => {
    const newState = authReducer(initialAuthState, AuthActions.checkSession())
    expect(newState.loading).toBe(true)
    expect(newState.loaded).toBe(false)
  })

  it('should return loaded state after checkSession success action', () => {
    const newState = authReducer(
      initialAuthState,
      AuthActions.checkSessionSuccess(),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return initial state after checkSession failure action', () => {
    const newState = authReducer(
      initialAuthState,
      AuthActions.checkSessionFailure(),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
  })
})
