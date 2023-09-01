import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { provideMockActions } from '@ngrx/effects/testing'
import { EMPTY, ReplaySubject, of, throwError } from 'rxjs'
import { AuthActions, LoginType } from './auth.actions'
import { AuthEffects } from './auth.effects'
import { AuthenticationService } from '@integration/authentication/authentication.service'
import { MessageService } from 'primeng/api'
import { take } from 'rxjs/operators'

describe('GIVEN: AuthEffects', () => {
  let actions: ReplaySubject<any>
  let effects: AuthEffects
  let authService: AuthenticationService
  let router: Router
  let messageService: MessageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        {
          provide: AuthenticationService,
          useValue: {
            login: () => EMPTY,
            logout: () => EMPTY,
            register: () => EMPTY,
            checkSession: () => EMPTY,
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
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

    effects = TestBed.inject(AuthEffects)
    authService = TestBed.inject(AuthenticationService)
    router = TestBed.inject(Router)
    messageService = TestBed.inject(MessageService)
  })

  describe('login$', () => {
    it('should navigate and dispatch loginSuccess on successful login as admin', () => {
      actions = new ReplaySubject(1)
      actions.next(
        AuthActions.login({
          credentials: { username: 'username', password: 'password' },
          rememberMe: false,
          loginType: LoginType.ADMIN,
        }),
      )
      jest.spyOn(authService, 'login').mockReturnValue(of({} as any))

      effects.login$.pipe(take(1)).subscribe(action => {
        expect(action).toEqual(AuthActions.loginSuccess())
        expect(router.navigate).toHaveBeenCalledWith(['/'])
      })
    })

    it('should navigate and dispatch loginSuccess on successful login as worker', () => {
      actions = new ReplaySubject(1)
      actions.next(
        AuthActions.login({
          credentials: { username: 'username', password: 'password' },
          rememberMe: false,
          loginType: LoginType.USER,
        }),
      )
      jest.spyOn(authService, 'login').mockReturnValue(of({} as any))

      effects.login$.pipe(take(1)).subscribe(action => {
        expect(action).toEqual(AuthActions.loginSuccess())
        expect(router.navigate).toHaveBeenCalledWith(['/worker'])
      })
    })

    it('should dispatch loginFailure on failed login', () => {
      actions = new ReplaySubject(1)
      actions.next(
        AuthActions.login({
          credentials: { username: 'username', password: 'password' },
          rememberMe: false,
          loginType: LoginType.ADMIN,
        }),
      )
      jest
        .spyOn(authService, 'login')
        .mockReturnValue(throwError(() => 'error'))

      effects.login$.pipe(take(1)).subscribe(action => {
        expect(messageService.add).toHaveBeenCalledWith({
          severity: 'error',
          summary: 'error',
        })
        expect(action).toEqual(AuthActions.loginFailure({ error: 'error' }))
      })
    })
  })

  describe('logout$', () => {
    it('should navigate and dispatch logoutSuccess on successful logout', () => {
      actions = new ReplaySubject(1)
      actions.next(AuthActions.logout())

      jest.spyOn(authService, 'logout').mockReturnValue(of({} as any))

      effects.logout$.pipe(take(1)).subscribe(action => {
        expect(action).toEqual(AuthActions.logoutSuccess())
        expect(router.navigate).toHaveBeenCalledWith(['/login'])
      })
    })

    it('should dispatch logoutFailure on failed logout', () => {
      actions = new ReplaySubject(1)
      actions.next(AuthActions.logout())

      jest
        .spyOn(authService, 'logout')
        .mockReturnValue(throwError(() => 'error'))

      effects.logout$.pipe(take(1)).subscribe(action => {
        expect(action).toEqual(AuthActions.logoutFailure({ error: 'error' }))
      })
    })
  })

  describe('register$', () => {
    it('should navigate and dispatch registerSuccess on successful register', () => {
      actions = new ReplaySubject(1)
      actions.next(
        AuthActions.register({
          payload: {
            username: 'username',
            password: 'password',
            name: 'name',
            lastName: 'lastName',
          },
        }),
      )

      jest.spyOn(authService, 'register').mockReturnValue(of({} as any))

      effects.register$.pipe(take(1)).subscribe(action => {
        expect(messageService.add).toHaveBeenCalledWith({
          severity: 'success',
          summary: 'Usuario creado',
        })
        expect(action).toEqual(AuthActions.registerSuccess())
        expect(router.navigate).toHaveBeenCalledWith(['/admin-login'])
      })
    })

    it('should dispatch registerFailure on failed register', () => {
      actions = new ReplaySubject(1)
      actions.next(
        AuthActions.register({
          payload: {
            username: 'username',
            password: 'password',
            name: 'name',
            lastName: 'lastName',
          },
        }),
      )

      jest
        .spyOn(authService, 'register')
        .mockReturnValue(throwError(() => 'error'))

      effects.register$.pipe(take(1)).subscribe(action => {
        expect(messageService.add).toHaveBeenCalledWith({
          severity: 'error',
          summary: 'error',
        })
        expect(action).toEqual(AuthActions.registerFailure({ error: 'error' }))
      })
    })
  })

  describe('checkSession$', () => {
    it('should dispatch checkSessionSuccess on successful checkSession', () => {
      actions = new ReplaySubject(1)
      actions.next(AuthActions.checkSession())

      jest.spyOn(authService, 'checkSession').mockReturnValue(of({} as any))

      effects.checkSession$.pipe(take(1)).subscribe(action => {
        expect(action).toEqual(AuthActions.checkSessionSuccess())
      })
    })

    it('should navigate and dispatch checkSessionFailure on failed checkSession', () => {
      actions = new ReplaySubject(1)
      actions.next(AuthActions.checkSession())

      jest
        .spyOn(authService, 'checkSession')
        .mockReturnValue(throwError(() => 'error'))

      effects.checkSession$.pipe(take(1)).subscribe(action => {
        expect(action).toEqual(AuthActions.checkSessionFailure())
        expect(router.navigate).toHaveBeenCalledWith(['/login'])
      })
    })
  })
})
