import { AppState } from '@redux/app.state'
import { initialAppStateMock } from '@redux/app.state.mock'
import { usersAdapter } from './users.state'
import { USER_RESPONSE_MOCK } from '@mocks/user.mock'
import * as UsersSelectors from './users.selectors'

const INITIAL_STATE: AppState = {
  ...initialAppStateMock,
  users: usersAdapter.getInitialState({
    entities: { [USER_RESPONSE_MOCK[0].id]: USER_RESPONSE_MOCK[0] },
    ids: [USER_RESPONSE_MOCK[0].id],
    nextPage: null,
    prevPage: null,
    total: USER_RESPONSE_MOCK.length,
    loading: false,
    loaded: true,
    error: undefined,
  }),
}

describe('GIVEN: UsersSelectors', () => {
  describe('WHEN: selectUsersState', () => {
    const result = UsersSelectors.selectUsersState(INITIAL_STATE)
    it('THEN: should return the users state', () => {
      expect(result).toEqual(INITIAL_STATE.users)
    })
  })

  describe('WHEN: selectUsersError', () => {
    const result = UsersSelectors.selectUsersError(INITIAL_STATE)
    it('THEN: should return the users error', () => {
      expect(result).toEqual(INITIAL_STATE.users.error)
    })
  })

  describe('WHEN: selectUsers', () => {
    const result = UsersSelectors.selectUsers(INITIAL_STATE)
    it('THEN: should return the users', () => {
      expect(result).toEqual([USER_RESPONSE_MOCK[0]])
    })
  })

  describe('WHEN: selectUsersLoading', () => {
    const result = UsersSelectors.selectUsersLoading(INITIAL_STATE)
    it('THEN: should return the users loading', () => {
      expect(result).toEqual(INITIAL_STATE.users.loading)
    })
  })

  describe('WHEN: selectUsersLoaded', () => {
    const result = UsersSelectors.selectUsersLoaded(INITIAL_STATE)
    it('THEN: should return the users loaded', () => {
      expect(result).toEqual(INITIAL_STATE.users.loaded)
    })
  })

  describe('WHEN: selectUsersNextPage', () => {
    const result = UsersSelectors.selectUsersNextPage(INITIAL_STATE)
    it('THEN: should return the users next page', () => {
      expect(result).toEqual(INITIAL_STATE.users.nextPage)
    })
  })

  describe('WHEN: selectUsersPrevPage', () => {
    const result = UsersSelectors.selectUsersPrevPage(INITIAL_STATE)
    it('THEN: should return the users prev page', () => {
      expect(result).toEqual(INITIAL_STATE.users.prevPage)
    })
  })

  describe('WHEN: selectUsersTotalItems', () => {
    const result = UsersSelectors.selectUsersTotalItems(INITIAL_STATE)
    it('THEN: should return the users total items', () => {
      expect(result).toEqual(INITIAL_STATE.users.total)
    })
  })
})
