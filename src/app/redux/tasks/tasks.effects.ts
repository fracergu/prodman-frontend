/* eslint-disable max-nested-callbacks */
import { Injectable } from '@angular/core'
import { TasksService } from '@integration/tasks/tasks.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MessageService } from 'primeng/api'
import { catchError, map, of, switchMap } from 'rxjs'
import { DEFAULT_PAGE_SIZE, ONE } from '@shared//constants'

import { TasksActions, TasksActionType } from './tasks.actions'

@Injectable()
export class TasksEffects {
  constructor(
    private _actions$: Actions,
    private _tasksService: TasksService,
    private _ms: MessageService,
  ) {}

  defaultParams = { page: ONE, limit: DEFAULT_PAGE_SIZE }

  loadTasks$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActionType.LOAD_TASKS),
      switchMap(({ params }) =>
        this._tasksService.getTasks(params).pipe(
          map(resp => {
            return TasksActions.loadTasksSuccess(resp)
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(TasksActions.loadTasksFailure({ error }))
          }),
        ),
      ),
    ),
  )

  createTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActionType.CREATE_TASK),
      switchMap(({ payload }) =>
        this._tasksService.createTask(payload).pipe(
          map(() => {
            this._showSuccessMessage(`Tarea creada`)
            return TasksActions.createTaskSuccess()
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(TasksActions.createTaskFailure({ error }))
          }),
        ),
      ),
    ),
  )

  createTaskSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActionType.CREATE_TASK_SUCCESS),
      map(() =>
        TasksActions.loadTasks({
          params: this.defaultParams,
        }),
      ),
    ),
  )

  updateTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActionType.UPDATE_TASK),
      switchMap(({ payload }) =>
        this._tasksService.updateTask(payload).pipe(
          map(resp => {
            this._showSuccessMessage(`Tarea actualizada`)
            return TasksActions.updateTaskSuccess({ payload: resp })
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(TasksActions.updateTaskFailure({ error }))
          }),
        ),
      ),
    ),
  )

  updateTaskSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActionType.UPDATE_TASK_SUCCESS),
      map(() =>
        TasksActions.loadTasks({
          params: this.defaultParams,
        }),
      ),
    ),
  )

  deleteTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActionType.DELETE_TASK),
      switchMap(({ id }) =>
        this._tasksService.deleteTask(id).pipe(
          map(() => {
            this._showSuccessMessage(`Tarea eliminada`)
            return TasksActions.deleteTaskSuccess({ id })
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(TasksActions.deleteTaskFailure({ error }))
          }),
        ),
      ),
    ),
  )

  deleteTaskSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TasksActionType.DELETE_TASK_SUCCESS),
      map(() =>
        TasksActions.loadTasks({
          params: this.defaultParams,
        }),
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
