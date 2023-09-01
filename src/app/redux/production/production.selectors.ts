import { createSelector } from '@ngrx/store'

import { AppState } from '../app.state'
import { productionAdapter } from './production.state'

export const selectProductionState = (state: AppState) => state.production

const { selectAll } = productionAdapter.getSelectors()

export const selectProduction = createSelector(selectProductionState, selectAll)

export const selectProductionLoading = createSelector(
  selectProductionState,
  productionState => productionState.loading,
)

export const selectProductionLoaded = createSelector(
  selectProductionState,
  productionState => productionState.loaded,
)

export const selectProductionError = createSelector(
  selectProductionState,
  productionState => productionState.error,
)

export const selectProductionNextPage = createSelector(
  selectProductionState,
  productionState => productionState.nextPage,
)

export const selectProductionPrevPage = createSelector(
  selectProductionState,
  productionState => productionState.prevPage,
)

export const selectProductionTotalItems = createSelector(
  selectProductionState,
  productionState => productionState.total,
)

export const selectProductionOverview = createSelector(
  selectProductionState,
  productionState => productionState.overview,
)
