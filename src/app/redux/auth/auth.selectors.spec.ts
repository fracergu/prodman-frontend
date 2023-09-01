import { AppState } from '@redux/app.state'
import { initialAppStateMock } from '@redux/app.state.mock'
import * as AuthSelectors from './auth.selectors'

const INITIAL_STATE: AppState = initialAppStateMock

describe('GIVEN: AuthSelectors', () => {
  describe('WHEN: selectAuthState is called', () => {
    const result = AuthSelectors.selectAuthState(INITIAL_STATE)
    it('THEN: should return the auth state', () => {
      expect(result).toEqual(INITIAL_STATE.auth)
    })
  })

  describe('WHEN: selectAuthError is called', () => {
    const result = AuthSelectors.selectAuthError(INITIAL_STATE)
    it('THEN: should return the auth error', () => {
      expect(result).toEqual(INITIAL_STATE.auth.error)
    })
  })
})
