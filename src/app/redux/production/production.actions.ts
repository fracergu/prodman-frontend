import { createAction, props } from '@ngrx/store'
import { PaginatedResponse } from '@shared/models/paginated-response'
import { ProductionReportSearchParameters } from '@shared/models/production-report-request.model'
import { ProductionReportResponse } from '@shared/models/production-report-response'
import { ProductionSearchParameters } from '@shared/models/production-request.model'
import { ProductionResponse } from '@shared/models/production-response'

export enum ProductionActionType {
  LOAD_PRODUCTIONS = '[Production] Load Productions',
  LOAD_PRODUCTIONS_SUCCESS = '[Production] Load Productions Success',
  LOAD_PRODUCTIONS_FAILURE = '[Production] Load Productions Failure',

  LOAD_OVEVIEW = '[Production] Load Overview',
  LOAD_OVEVIEW_SUCCESS = '[Production] Load Overview Success',
  LOAD_OVEVIEW_FAILURE = '[Production] Load Overview Failure',
}

export const loadProduction = createAction(
  ProductionActionType.LOAD_PRODUCTIONS,
  props<{ params: ProductionSearchParameters }>(),
)

export const loadProductionSuccess = createAction(
  ProductionActionType.LOAD_PRODUCTIONS_SUCCESS,
  props<PaginatedResponse<ProductionResponse>>(),
)

export const loadProductionFailure = createAction(
  ProductionActionType.LOAD_PRODUCTIONS_FAILURE,
  props<{ error: string }>(),
)

export const loadOverview = createAction(
  ProductionActionType.LOAD_OVEVIEW,
  props<{ params: ProductionReportSearchParameters }>(),
)

export const loadOverviewSuccess = createAction(
  ProductionActionType.LOAD_OVEVIEW_SUCCESS,
  props<{ payload: ProductionReportResponse }>(),
)

export const loadOverviewFailure = createAction(
  ProductionActionType.LOAD_OVEVIEW_FAILURE,
  props<{ error: string }>(),
)

export const ProductionActions = {
  loadProduction,
  loadProductionSuccess,
  loadProductionFailure,
  loadOverview,
  loadOverviewSuccess,
  loadOverviewFailure,
}
