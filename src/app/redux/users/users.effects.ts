/* eslint-disable max-nested-callbacks */
import { Injectable } from '@angular/core'
import { UsersService } from '@integration/users/users.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MessageService } from 'primeng/api'
import { catchError, map, of, switchMap } from 'rxjs'

import { UsersActions, UsersActionType } from './users.actions'

@Injectable()
export class UserEffects {
  constructor(
    private _actions$: Actions,
    private _usersService: UsersService,
    private _ms: MessageService,
  ) {}

  loadUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UsersActionType.LOAD_USERS),
      switchMap(({ params }) =>
        this._usersService.getUsers(params).pipe(
          map(resp => {
            return UsersActions.loadUsersSuccess(resp)
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(UsersActions.loadUsersFailure({ error }))
          }),
        ),
      ),
    ),
  )

  createUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UsersActionType.CREATE_USER),
      switchMap(({ payload }) =>
        this._usersService.createUser(payload).pipe(
          map(() => {
            this._showSuccessMessage(`Usuario creado`)
            return UsersActions.createUserSuccess()
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(UsersActions.createUserFailure({ error }))
          }),
        ),
      ),
    ),
  )

  updateUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UsersActionType.UPDATE_USER),
      switchMap(({ payload }) =>
        this._usersService.updateUser(payload).pipe(
          map(resp => {
            this._showSuccessMessage(`Usuario ${resp.name} actualizado`)
            return UsersActions.updateUserSuccess({ payload: resp })
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(UsersActions.updateUserFailure({ error }))
          }),
        ),
      ),
    ),
  )

  updateUserCredentials$ = createEffect(() =>
    this._actions$.pipe(
      ofType(UsersActionType.UPDATE_USER_CREDENTIALS),
      switchMap(({ id, credentials }) =>
        this._usersService.updateUserCredentials(id, credentials).pipe(
          map(resp => {
            return UsersActions.updateUserCredentialsSuccess({ payload: resp })
          }),
          catchError(error => {
            return of(UsersActions.updateUserCredentialsFailure({ error }))
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
