import { Action } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'
import { ReplaySubject, of, throwError } from 'rxjs'
import { UsersService } from '@integration/users/users.service'
import { MessageService } from 'primeng/api'
import { PaginatedResponse } from '@shared/models/paginated-response'
import { UserResponse } from '@shared/models/user-response.model'
import { USER_RESPONSE_MOCK } from '@mocks/user.mock'
import { TestBed } from '@angular/core/testing'
import { UserEffects } from './users.effects'
import { UsersActions } from './users.actions'
import { UserSearchParameters } from '@shared/models/user-request.model'

describe('GIVEN: UsersEffects', () => {
  let actions: ReplaySubject<Action>
  let effects: UserEffects
  let usersService: UsersService
  let messageService: MessageService

  const usersResponseMock: PaginatedResponse<UserResponse> = {
    data: USER_RESPONSE_MOCK,
    total: USER_RESPONSE_MOCK.length,
    prevPage: null,
    nextPage: null,
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions),
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn().mockReturnValue(of(usersResponseMock)),
            createUser: jest.fn().mockReturnValue(of(USER_RESPONSE_MOCK[0])),
            updateUser: jest.fn().mockReturnValue(of(USER_RESPONSE_MOCK[0])),
            deleteUser: jest.fn().mockReturnValue(of(null)),
            updateUserCredentials: jest
              .fn()
              .mockReturnValue(of(USER_RESPONSE_MOCK[0])),
          },
        },
        {
          provide: MessageService,
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    })

    effects = TestBed.inject(UserEffects)
    usersService = TestBed.inject(UsersService)
    messageService = TestBed.inject(MessageService)
  })

  describe('WHEN loadUsers$', () => {
    it('THEN: should return a loadUsersSuccess action', () => {
      const action = UsersActions.loadUsers({
        params: {} as UserSearchParameters,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.loadUsers$.subscribe(resultAction => {
        expect(resultAction).toEqual(
          UsersActions.loadUsersSuccess(usersResponseMock),
        )
      })
    })

    it('THEN: should return a loadUsersFail action', () => {
      jest
        .spyOn(usersService, 'getUsers')
        .mockReturnValue(throwError(() => new Error('error')))

      const action = UsersActions.loadUsers({
        params: {} as UserSearchParameters,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.loadUsers$.subscribe(resultAction => {
        expect(resultAction).toEqual(
          UsersActions.loadUsersFailure({ error: 'error' }),
        )
      })
    })
  })

  describe('WHEN createUser$', () => {
    it('THEN: should return a createUserSuccess action', () => {
      const action = UsersActions.createUser({
        payload: {} as UserSearchParameters,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.createUser$.subscribe(resultAction => {
        expect(resultAction).toEqual(UsersActions.createUserSuccess())
      })
    })

    it('THEN: should return a createUserFail action', () => {
      jest
        .spyOn(usersService, 'createUser')
        .mockReturnValue(throwError(() => new Error('error')))

      const action = UsersActions.createUser({
        payload: {} as UserSearchParameters,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.createUser$.subscribe(resultAction => {
        expect(resultAction).toEqual(
          UsersActions.createUserFailure({ error: 'error' }),
        )
      })
    })
  })

  describe('WHEN updateUser$', () => {
    it('THEN: should return a updateUserSuccess action', () => {
      const action = UsersActions.updateUser({
        payload: {} as UserSearchParameters,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.updateUser$.subscribe(resultAction => {
        expect(resultAction).toEqual(
          UsersActions.updateUserSuccess({
            payload: USER_RESPONSE_MOCK[0],
          }),
        )
      })
    })

    it('THEN: should return a updateUserFail action', () => {
      jest
        .spyOn(usersService, 'updateUser')
        .mockReturnValue(throwError(() => new Error('error')))

      const action = UsersActions.updateUser({
        payload: {} as UserSearchParameters,
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.updateUser$.subscribe(resultAction => {
        expect(resultAction).toEqual(
          UsersActions.updateUserFailure({ error: 'error' }),
        )
      })
    })
  })

  describe('WHEN: updateUserCredentials$', () => {
    it('THEN: should return a updateUserCredentialsSuccess action', () => {
      const action = UsersActions.updateUserCredentials({
        id: 1,
        credentials: {
          username: 'username',
          password: 'password',
        },
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.updateUserCredentials$.subscribe(resultAction => {
        expect(resultAction).toEqual(
          UsersActions.updateUserCredentialsSuccess({
            payload: USER_RESPONSE_MOCK[0],
          }),
        )
      })
    })

    it('THEN: should return a updateUserCredentialsFail action', () => {
      jest
        .spyOn(usersService, 'updateUserCredentials')
        .mockReturnValue(throwError(() => new Error('error')))

      const action = UsersActions.updateUserCredentials({
        id: 1,
        credentials: {
          username: 'username',
          password: 'password',
        },
      })
      actions = new ReplaySubject<Action>(1)
      actions.next(action)

      effects.updateUserCredentials$.subscribe(resultAction => {
        expect(resultAction).toEqual(
          UsersActions.updateUserCredentialsFailure({ error: 'error' }),
        )
      })
    })
  })
})
