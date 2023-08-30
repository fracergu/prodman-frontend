import { createSelector } from '@ngrx/store'

import { AppState } from '../app.state'
import { productsAdapter } from './products.state'

export const selectProductsState = (state: AppState) => state.products

const { selectAll, selectEntities } = productsAdapter.getSelectors()

export const selectProducts = createSelector(selectProductsState, selectAll)

export const selectEntity = (id: number) =>
  createSelector(selectEntities, entities => entities[id])

export const selectProductsLoading = createSelector(
  selectProductsState,
  productsState => productsState.loading,
)

export const selectProductsLoaded = createSelector(
  selectProductsState,
  productsState => productsState.loaded,
)

export const selectProductsError = createSelector(
  selectProductsState,
  productsState => productsState.error,
)

export const selectProductsNextPage = createSelector(
  selectProductsState,
  productsState => productsState.nextPage,
)

export const selectProductsPrevPage = createSelector(
  selectProductsState,
  productsState => productsState.prevPage,
)

export const selectProductsTotalItems = createSelector(
  selectProductsState,
  productsState => productsState.total,
)
