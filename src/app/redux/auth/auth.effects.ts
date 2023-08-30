/* eslint-disable max-nested-callbacks */
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '@integration/authentication/authentication.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MessageService } from 'primeng/api'
import { catchError, map, of, switchMap } from 'rxjs'

import { AuthActions, AuthActionType, LoginType } from './auth.actions'

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _authService: AuthenticationService,
    private _router: Router,
    private _ms: MessageService,
  ) {}

  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActionType.LOGIN),
      switchMap(({ credentials, rememberMe, loginType }) =>
        this._authService.login(credentials, rememberMe).pipe(
          map(() => {
            this._router.navigate(
              loginType === LoginType.ADMIN ? ['/'] : ['/worker'],
            )
            return AuthActions.loginSuccess()
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(AuthActions.loginFailure({ error }))
          }),
        ),
      ),
    ),
  )

  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActionType.LOGOUT),
      switchMap(() =>
        this._authService.logout().pipe(
          map(() => {
            this._router.navigate(['/login'])
            return AuthActions.logoutSuccess()
          }),
          catchError(error => {
            return of(AuthActions.logoutFailure({ error }))
          }),
        ),
      ),
    ),
  )

  register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActionType.REGISTER),
      switchMap(({ payload }) =>
        this._authService.register(payload).pipe(
          map(() => {
            this._router.navigate(['/admin-login'])
            this._showSuccessMessage(`Usuario creado`)
            return AuthActions.registerSuccess()
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(AuthActions.registerFailure({ error }))
          }),
        ),
      ),
    ),
  )

  checkSession$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActionType.CHECK_SESSION),
      switchMap(() =>
        this._authService.checkSession().pipe(
          map(() => {
            return AuthActions.checkSessionSuccess()
          }),
          catchError(() => {
            this._router.navigate(['/login'])
            return of(AuthActions.checkSessionFailure())
          }),
        ),
      ),
    ),
  )

  private _showSuccessMessage(message: string) {
    this._ms.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    })
  }

  private _showErrorMessage(message: string) {
    this._ms.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    })
  }
}
