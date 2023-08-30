/* eslint-disable max-nested-callbacks */
import { Injectable } from '@angular/core'
import { ProductsService } from '@integration/products/products.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MessageService } from 'primeng/api'
import { catchError, map, of, switchMap } from 'rxjs'

import { ProductsActions, ProdutcsActionType } from './products.actions'

@Injectable()
export class ProductsEffects {
  constructor(
    private _actions$: Actions,
    private _productsService: ProductsService,
    private _ms: MessageService,
  ) {}

  loadProducts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProdutcsActionType.LOAD_PRODUCTS),
      switchMap(({ params }) =>
        this._productsService.getProducts(params).pipe(
          map(resp => {
            return ProductsActions.loadProductsSuccess(resp)
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(ProductsActions.loadProductsFailure({ error }))
          }),
        ),
      ),
    ),
  )

  createProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProdutcsActionType.CREATE_PRODUCT),
      switchMap(({ payload }) =>
        this._productsService.createProduct(payload).pipe(
          map(() => {
            this._showSuccessMessage(`Producto creado`)
            return ProductsActions.createProductSuccess()
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(ProductsActions.createProductFailure({ error }))
          }),
        ),
      ),
    ),
  )

  updateProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProdutcsActionType.UPDATE_PRODUCT),
      switchMap(({ payload }) =>
        this._productsService.updateProduct(payload).pipe(
          map(resp => {
            this._showSuccessMessage(`Producto ${resp.name} actualizado`)
            return ProductsActions.updateProductSuccess({ payload: resp })
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(ProductsActions.updateProductFailure({ error }))
          }),
        ),
      ),
    ),
  )

  deleteProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProdutcsActionType.DELETE_PRODUCT),
      switchMap(({ id }) =>
        this._productsService.deleteProduct(id).pipe(
          map(() => {
            this._showSuccessMessage(`Producto eliminado`)
            return ProductsActions.deleteProductSuccess(id)
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(ProductsActions.deleteProductFailure({ error }))
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
