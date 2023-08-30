import { createAction, props } from '@ngrx/store'
import {
  CategoriesSearchParameters,
  CategoryRequest,
} from '@shared/models/product-request.model'
import { Category } from '@shared/models/product-response.model'

export enum CategoriesActionType {
  LOAD_CATEGORIES = '[Categories] Load Categories',
  LOAD_CATEGORIES_SUCCESS = '[Categories] Load Categories Success',
  LOAD_CATEGORIES_FAILURE = '[Categories] Load Categories Failure',
  CREATE_CATEGORY = '[Categories] Create Category',
  CREATE_CATEGORY_SUCCESS = '[Categories] Create Category Success',
  CREATE_CATEGORY_FAILURE = '[Categories] Create Category Failure',
  UPDATE_CATEGORY = '[Categories] Update Category',
  UPDATE_CATEGORY_SUCCESS = '[Categories] Update Category Success',
  UPDATE_CATEGORY_FAILURE = '[Categories] Update Category Failure',
  DELETE_CATEGORY = '[Categories] Delete Category',
  DELETE_CATEGORY_SUCCESS = '[Categories] Delete Category Success',
  DELETE_CATEGORY_FAILURE = '[Categories] Delete Category Failure',
}

export const loadCategories = createAction(
  CategoriesActionType.LOAD_CATEGORIES,
  props<{ params: CategoriesSearchParameters }>(),
)

export const loadCategoriesSuccess = createAction(
  CategoriesActionType.LOAD_CATEGORIES_SUCCESS,
  props<{ payload: Category[] }>(),
)

export const loadCategoriesFailure = createAction(
  CategoriesActionType.LOAD_CATEGORIES_FAILURE,
  props<{ error: string }>(),
)

export const createCategory = createAction(
  CategoriesActionType.CREATE_CATEGORY,
  props<{ payload: CategoryRequest }>(),
)

export const createCategorySuccess = createAction(
  CategoriesActionType.CREATE_CATEGORY_SUCCESS,
  props<{ payload: Category }>(),
)

export const createCategoryFailure = createAction(
  CategoriesActionType.CREATE_CATEGORY_FAILURE,
  props<{ error: string }>(),
)

export const updateCategory = createAction(
  CategoriesActionType.UPDATE_CATEGORY,
  props<{ payload: CategoryRequest }>(),
)

export const updateCategorySuccess = createAction(
  CategoriesActionType.UPDATE_CATEGORY_SUCCESS,
  props<{ payload: Category }>(),
)

export const updateCategoryFailure = createAction(
  CategoriesActionType.UPDATE_CATEGORY_FAILURE,
  props<{ error: string }>(),
)

export const deleteCategory = createAction(
  CategoriesActionType.DELETE_CATEGORY,
  props<{ id: number }>(),
)

export const deleteCategorySuccess = createAction(
  CategoriesActionType.DELETE_CATEGORY_SUCCESS,
  props<{ id: number }>(),
)

export const deleteCategoryFailure = createAction(
  CategoriesActionType.DELETE_CATEGORY_FAILURE,
  props<{ error: string }>(),
)

export const CategoriesActions = {
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  createCategory,
  createCategorySuccess,
  createCategoryFailure,
  updateCategory,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFailure,
}
