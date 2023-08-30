/* eslint-disable max-nested-callbacks */
import { Injectable } from '@angular/core'
import { ConfigService } from '@integration/config/config.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MessageService } from 'primeng/api'
import { catchError, map, of, switchMap } from 'rxjs'

import { ConfigActions, ConfigActionType } from './config.actions'

@Injectable()
export class ConfigEffects {
  constructor(
    private _actions$: Actions,
    private _configService: ConfigService,
    private _ms: MessageService,
  ) {}

  loadConfig$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ConfigActionType.LOAD_CONFIG),
      switchMap(() =>
        this._configService.getConfiguration().pipe(
          map(config => {
            return ConfigActions.loadConfigSuccess({ payload: config })
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(ConfigActions.loadConfigFailure({ error }))
          }),
        ),
      ),
    ),
  )

  updateConfig$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ConfigActionType.UPDATE_CONFIG),
      switchMap(({ config }) =>
        this._configService.updateConfiguration(config).pipe(
          map(config => {
            this._showSuccessMessage('Configuración actualizada')
            return ConfigActions.updateConfigSuccess({ payload: config })
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(ConfigActions.updateConfigFailure({ error }))
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
