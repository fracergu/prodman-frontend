import { createSelector } from '@ngrx/store'

import { AppState } from '../app.state'
import { categoriesAdapter } from './categories.state'

export const selectCategoriesState = (state: AppState) => state.categories

const { selectAll, selectEntities } = categoriesAdapter.getSelectors()

export const selectCategories = createSelector(selectCategoriesState, selectAll)

export const selectEntity = (id: number) =>
  createSelector(selectEntities, entities => entities[id])

export const selectCategoriesLoading = createSelector(
  selectCategoriesState,
  categoriesState => categoriesState.loading,
)

export const selectCategoriesLoaded = createSelector(
  selectCategoriesState,
  categoriesState => categoriesState.loaded,
)

export const selectCategoriesError = createSelector(
  selectCategoriesState,
  categoriesState => categoriesState.error,
)
