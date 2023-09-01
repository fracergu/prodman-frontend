import { createSelector } from '@ngrx/store'

import { AppState } from '../app.state'
import { categoriesAdapter, CategoriesState } from './categories.state'

export const selectCategoriesState = (state: AppState) => state.categories

const { selectAll } = categoriesAdapter.getSelectors()

export const selectCategories = createSelector(selectCategoriesState, selectAll)

export const selectCategoriesLoading = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.loading,
)

export const selectCategoriesLoaded = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.loaded,
)

export const selectCategoriesError = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.error,
)
