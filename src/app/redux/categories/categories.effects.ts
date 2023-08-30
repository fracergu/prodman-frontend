/* eslint-disable max-nested-callbacks */
import { Injectable } from '@angular/core'
import { CategoriesService } from '@integration/categories/categories.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MessageService } from 'primeng/api'
import { catchError, map, of, switchMap } from 'rxjs'

import { CategoriesActions, CategoriesActionType } from './categories.actions'

@Injectable()
export class CategoriesEffects {
  constructor(
    private _actions$: Actions,
    private _categoriesService: CategoriesService,
    private _ms: MessageService,
  ) {}

  loadCategories$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CategoriesActionType.LOAD_CATEGORIES),
      switchMap(({ params }) =>
        this._categoriesService.getCategories(params).pipe(
          map(resp => {
            return CategoriesActions.loadCategoriesSuccess({ payload: resp })
          }),
          catchError(error => {
            return of(CategoriesActions.loadCategoriesFailure({ error }))
          }),
        ),
      ),
    ),
  )

  createCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CategoriesActionType.CREATE_CATEGORY),
      switchMap(({ payload }) =>
        this._categoriesService.createCategory(payload).pipe(
          map(resp => {
            this._showSuccessMessage(`Categoría ${resp.name} creada`)
            return CategoriesActions.createCategorySuccess({ payload: resp })
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(CategoriesActions.createCategoryFailure({ error }))
          }),
        ),
      ),
    ),
  )

  updateCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CategoriesActionType.UPDATE_CATEGORY),
      switchMap(({ payload }) =>
        this._categoriesService.updateCategory(payload).pipe(
          map(resp => {
            this._showSuccessMessage(`Categoría ${resp.name} actualizada`)
            return CategoriesActions.updateCategorySuccess({ payload: resp })
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(CategoriesActions.updateCategoryFailure({ error }))
          }),
        ),
      ),
    ),
  )

  deleteCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CategoriesActionType.DELETE_CATEGORY),
      switchMap(({ id }) =>
        this._categoriesService.deleteCategory(id).pipe(
          map(() => {
            this._showSuccessMessage(`Categoría eliminada`)
            return CategoriesActions.deleteCategorySuccess({ id })
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(CategoriesActions.deleteCategoryFailure({ error }))
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
