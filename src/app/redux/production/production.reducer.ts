import { Action, createReducer, on } from '@ngrx/store'
import { PaginatedResponse } from '@shared/models/paginated-response'
import { ProductionResponse } from '@shared/models/production-response'

import { ProductionActions } from './production.actions'
import {
  initialProductionState,
  productionAdapter,
  ProductionState,
} from './production.state'

const _productionReducer = createReducer(
  initialProductionState,
  on(ProductionActions.loadProductions, state => ({
    ...state,
    loading: true,
  })),
  on(ProductionActions.loadProductionsSuccess, _loadProductionsSucces),
  on(ProductionActions.loadProductionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(ProductionActions.loadOverview, state => ({
    ...state,
    overview: undefined,
    loading: true,
  })),
  on(ProductionActions.loadOverviewSuccess, (state, { payload }) => ({
    ...state,
    overview: payload,
    loading: false,
    loaded: true,
  })),
  on(ProductionActions.loadOverviewFailure, (state, { error }) => ({
    ...state,
    overview: undefined,
    loading: false,
    loaded: false,
    error,
  })),
)

function _loadProductionsSucces(
  state: ProductionState,
  data: PaginatedResponse<ProductionResponse>,
) {
  const { data: productions, nextPage, prevPage, total } = data

  return productionAdapter.setAll(productions, {
    ...state,
    loading: false,
    loaded: true,
    nextPage,
    prevPage,
    total,
  })
}

export function productionReducer(
  state: ProductionState | undefined,
  action: Action,
) {
  return _productionReducer(state, action)
}
