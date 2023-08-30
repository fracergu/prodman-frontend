import { Action, createReducer, on } from '@ngrx/store'

import { CategoriesActions } from './categories.actions'
import {
  categoriesAdapter,
  CategoriesState,
  initialCategoryState,
} from './categories.state'

const _categoriesreducers = createReducer(
  initialCategoryState,
  on(CategoriesActions.loadCategories, state => ({
    ...state,
    loading: true,
  })),
  on(CategoriesActions.loadCategoriesSuccess, (state, { payload }) => ({
    ...categoriesAdapter.setAll(payload, state),
    loading: false,
    loaded: true,
  })),
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(CategoriesActions.createCategory, state => ({
    ...state,
    loading: true,
  })),
  on(CategoriesActions.createCategorySuccess, (state, { payload }) => ({
    ...categoriesAdapter.addOne(payload, state),
    loading: false,
    loaded: true,
  })),
  on(CategoriesActions.createCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),

  on(CategoriesActions.updateCategory, state => ({
    ...state,
    loading: true,
  })),
  on(CategoriesActions.updateCategorySuccess, (state, { payload }) => ({
    ...categoriesAdapter.updateOne({ id: payload.id, changes: payload }, state),
    loading: false,
    loaded: true,
  })),

  on(CategoriesActions.updateCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(CategoriesActions.deleteCategory, state => ({
    ...state,
    loading: true,
  })),
  on(CategoriesActions.deleteCategorySuccess, (state, { id }) => ({
    ...categoriesAdapter.removeOne(id, state),
    loading: false,
    loaded: true,
  })),
  on(CategoriesActions.deleteCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
)

export function categoriesReducer(
  state: CategoriesState | undefined,
  action: Action,
) {
  return _categoriesreducers(state, action)
}
