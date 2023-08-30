import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { ProductResponse } from '@shared/models/product-response.model'

export interface ProductsState extends EntityState<ProductResponse> {
  nextPage?: number | null
  prevPage?: number | null
  total?: number
  loading: boolean
  loaded: boolean
  error?: string
}

export const productsAdapter: EntityAdapter<ProductResponse> =
  createEntityAdapter<ProductResponse>({
    selectId: (product: ProductResponse) => product.id,
  })

export const initialProductState: ProductsState =
  productsAdapter.getInitialState({
    loading: false,
    loaded: false,
  })
