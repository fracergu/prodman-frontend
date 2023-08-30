import { createAction, props } from '@ngrx/store'
import { PaginatedResponse } from '@shared/models/paginated-response'
import {
  ProductRequest,
  ProductSearchParameters,
} from '@shared/models/product-request.model'
import { ProductResponse } from '@shared/models/product-response.model'

export enum ProdutcsActionType {
  LOAD_PRODUCTS = '[Products] Load Products',
  LOAD_PRODUCTS_SUCCESS = '[Products] Load Products Success',
  LOAD_PRODUCTS_FAILURE = '[Products] Load Products Failure',

  CREATE_PRODUCT = '[Products] Create Product',
  CREATE_PRODUCT_SUCCESS = '[Products] Create Product Success',
  CREATE_PRODUCT_FAILURE = '[Products] Create Product Failure',

  UPDATE_PRODUCT = '[Products] Update Product',
  UPDATE_PRODUCT_SUCCESS = '[Products] Update Product Success',
  UPDATE_PRODUCT_FAILURE = '[Products] Update Product Failure',

  DELETE_PRODUCT = '[Products] Delete Product',
  DELETE_PRODUCT_SUCCESS = '[Products] Delete Product Success',
  DELETE_PRODUCT_FAILURE = '[Products] Delete Product Failure',
}

export const loadProducts = createAction(
  ProdutcsActionType.LOAD_PRODUCTS,
  props<{ params: ProductSearchParameters }>(),
)

export const loadProductsSuccess = createAction(
  ProdutcsActionType.LOAD_PRODUCTS_SUCCESS,
  props<PaginatedResponse<ProductResponse>>(),
)

export const loadProductsFailure = createAction(
  ProdutcsActionType.LOAD_PRODUCTS_FAILURE,
  props<{ error: string }>(),
)

export const createProduct = createAction(
  ProdutcsActionType.CREATE_PRODUCT,
  props<{ payload: ProductRequest }>(),
)

export const createProductSuccess = createAction(
  ProdutcsActionType.CREATE_PRODUCT_SUCCESS,
)

export const createProductFailure = createAction(
  ProdutcsActionType.CREATE_PRODUCT_FAILURE,
  props<{ error: string }>(),
)

export const updateProduct = createAction(
  ProdutcsActionType.UPDATE_PRODUCT,
  props<{ payload: ProductRequest }>(),
)

export const updateProductSuccess = createAction(
  ProdutcsActionType.UPDATE_PRODUCT_SUCCESS,
  props<{ payload: ProductResponse }>(),
)

export const updateProductFailure = createAction(
  ProdutcsActionType.UPDATE_PRODUCT_FAILURE,
  props<{ error: string }>(),
)

export const deleteProduct = createAction(
  ProdutcsActionType.DELETE_PRODUCT,
  props<{ id: number }>(),
)

export const deleteProductSuccess = createAction(
  ProdutcsActionType.DELETE_PRODUCT_SUCCESS,
  props<{ id: number }>(),
)

export const deleteProductFailure = createAction(
  ProdutcsActionType.DELETE_PRODUCT_FAILURE,
  props<{ error: string }>(),
)

export const ProductsActions = {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  createProduct,
  createProductSuccess,
  createProductFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
}
