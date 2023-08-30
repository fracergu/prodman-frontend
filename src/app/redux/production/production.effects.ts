/* eslint-disable max-nested-callbacks */
import { Injectable } from '@angular/core'
import { ProductionService } from '@integration/production/production.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MessageService } from 'primeng/api'
import { catchError, map, of, switchMap } from 'rxjs'

import { ProductionActions, ProductionActionType } from './production.actions'

@Injectable()
export class ProductionEffects {
  constructor(
    private _actions$: Actions,
    private _productionService: ProductionService,
    private _ms: MessageService,
  ) {}

  loadProuction$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductionActionType.LOAD_PRODUCTIONS),
      switchMap(({ params }) =>
        this._productionService.getProduction(params).pipe(
          map(resp => {
            return ProductionActions.loadProductionsSuccess(resp)
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(ProductionActions.loadProductionsFailure({ error }))
          }),
        ),
      ),
    ),
  )

  loadOverview$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ProductionActionType.LOAD_OVEVIEW),
      switchMap(params =>
        this._productionService.getProductionReport(params).pipe(
          map(overview => {
            return ProductionActions.loadOverviewSuccess({ payload: overview })
          }),
          catchError(error => {
            this._showErrorMessage(error)
            return of(ProductionActions.loadOverviewFailure({ error }))
          }),
        ),
      ),
    ),
  )

  private _showErrorMessage(error: any) {
    this._ms.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
    })
  }
}
