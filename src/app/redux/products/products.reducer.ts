import { Action, createReducer, on } from '@ngrx/store'
import { PaginatedResponse } from '@shared/models/paginated-response'
import { ProductResponse } from '@shared/models/product-response.model'

import { ProductsActions } from './products.actions'
import {
  initialProductState,
  productsAdapter,
  ProductsState,
} from './products.state'

const _productsReducer = createReducer(
  initialProductState,
  on(ProductsActions.loadProducts, state => ({
    ...state,
    loading: true,
  })),
  on(ProductsActions.loadProductsSuccess, _loadProductsSucces),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(ProductsActions.createProduct, state => ({
    ...state,
    loading: true,
  })),
  on(ProductsActions.createProductSuccess, state => ({
    ...state,
    loading: false,
    loaded: true,
  })),
  on(ProductsActions.createProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(ProductsActions.updateProduct, state => ({
    ...state,
    loading: true,
  })),
  on(ProductsActions.updateProductSuccess, (state, { payload }) => ({
    ...productsAdapter.updateOne({ id: payload.id, changes: payload }, state),
    loading: false,
    loaded: true,
  })),
  on(ProductsActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(ProductsActions.deleteProduct, state => ({
    ...state,
    loading: true,
  })),
  on(ProductsActions.deleteProductSuccess, (state, { id }) => ({
    ...productsAdapter.removeOne(id, state),
    loading: false,
    loaded: true,
  })),
  on(ProductsActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
)

function _loadProductsSucces(
  state: ProductsState,
  data: PaginatedResponse<ProductResponse>,
): ProductsState {
  const { data: products, nextPage, prevPage, total } = data

  return productsAdapter.setAll(products, {
    ...state,
    loading: false,
    loaded: true,
    nextPage,
    prevPage,
    total,
  })
}

export function productsReducer(
  state: ProductsState | undefined,
  action: Action,
) {
  return _productsReducer(state, action)
}
