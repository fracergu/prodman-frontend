/* eslint-disable max-nested-callbacks */
import { Injectable } from '@angular/core'
import { WorkerService } from '@integration/worker/worker.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MessageService } from 'primeng/api'
import { catchError, map, of, switchMap } from 'rxjs'

import { WorkerActions, WorkerActionType } from './worker.actions'

@Injectable()
export class WorkerEffects {
  constructor(
    private _actions$: Actions,
    private _workerService: WorkerService,
    private _ms: MessageService,
  ) {}

  loadTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(WorkerActionType.LOAD_TASK),
      switchMap(() =>
        this._workerService.getTask().pipe(
          map(task => {
            return WorkerActions.loadTaskSuccess({ payload: task })
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(WorkerActions.loadTaskFailure({ error }))
          }),
        ),
      ),
    ),
  )

  loadActiveWorkers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(WorkerActionType.LOAD_ACTIVE_WORKERS),
      switchMap(() =>
        this._workerService.getActiveWorkers().pipe(
          map(activeWorkers => {
            return WorkerActions.loadActiveWorkersSuccess({
              payload: activeWorkers,
            })
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(WorkerActions.loadActiveWorkersFailure({ error }))
          }),
        ),
      ),
    ),
  )

  completeTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(WorkerActionType.COMPLETE_TASK),
      switchMap(({ payload }) =>
        this._workerService.completeTask(payload).pipe(
          map(() => {
            this._showSuccessMessage('Tarea actualizada')
            return WorkerActions.completeTaskSuccess()
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(WorkerActions.completeTaskFailure({ error }))
          }),
        ),
      ),
    ),
  )

  completeTaskSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(WorkerActionType.COMPLETE_TASK_SUCCESS),
      map(() => WorkerActions.loadTask()),
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
