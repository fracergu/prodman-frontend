import { PRODUCT_RESPONSE_MOCK } from '@mocks/product.mock'
import { ProductsActions } from './products.actions'
import { productsReducer } from './products.reducer'
import { ProductsState, initialProductState } from './products.state'

describe('ProductsReducer', () => {
  let initialState: ProductsState

  const mockPaginatedResponse = {
    data: PRODUCT_RESPONSE_MOCK,
    nextPage: null,
    prevPage: null,
    total: 0,
  }

  const mockError = 'Some Error'

  beforeEach(() => {
    initialState = { ...initialProductState }
  })

  it('should return loading state after loadProducts action', () => {
    const newState = productsReducer(
      initialState,
      ProductsActions.loadProducts({ params: { page: 1, limit: 2 } }),
    )
    expect(newState.loading).toBe(true)
    expect(newState.loaded).toBe(false)
  })

  it('should return loaded state and updated products after loadProductsSuccess action', () => {
    const newState = productsReducer(
      initialState,
      ProductsActions.loadProductsSuccess(mockPaginatedResponse),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
    expect(newState.total).toEqual(mockPaginatedResponse.total)
  })

  it('should return error state after loadProductsFailure action', () => {
    const newState = productsReducer(
      initialState,
      ProductsActions.loadProductsFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })

  it('should return loading state after createProduct action', () => {
    const newState = productsReducer(
      initialState,
      ProductsActions.createProduct({
        payload: {
          name: 'Apple',
          description: 'Fresh Apple',
        },
      }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state after createProductSuccess action', () => {
    const newState = productsReducer(
      initialState,
      ProductsActions.createProductSuccess(),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after createProductFailure action', () => {
    const newState = productsReducer(
      initialState,
      ProductsActions.createProductFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })

  it('should return loading state after updateProduct action', () => {
    const newState = productsReducer(
      initialState,
      ProductsActions.updateProduct({
        payload: {
          id: 1,
          name: 'Apple',
          description: 'Fresh Apple',
        },
      }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state after updateProductSuccess action', () => {
    const newState = productsReducer(
      initialState,
      ProductsActions.updateProductSuccess({
        payload: PRODUCT_RESPONSE_MOCK[0],
      }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after updateProductFailure action', () => {
    const newState = productsReducer(
      initialState,
      ProductsActions.updateProductFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })

  it('should return loading state after deleteProduct action', () => {
    const newState = productsReducer(
      initialState,
      ProductsActions.deleteProduct({ id: 1 }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state after deleteProductSuccess action', () => {
    const newState = productsReducer(
      initialState,
      ProductsActions.deleteProductSuccess({ id: 1 }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after deleteProductFailure action', () => {
    const newState = productsReducer(
      initialState,
      ProductsActions.deleteProductFailure({ error: mockError }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toEqual(mockError)
  })
})
