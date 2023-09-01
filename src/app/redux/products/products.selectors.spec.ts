import { AppState } from '@redux/app.state'
import { initialAppStateMock } from '@redux/app.state.mock'
import { productsAdapter } from './products.state'
import { PRODUCT_RESPONSE_MOCK } from '@mocks/product.mock'
import * as ProductsSelectors from './products.selectors'

const INITIAL_STATE: AppState = {
  ...initialAppStateMock,
  products: productsAdapter.getInitialState({
    entities: { [PRODUCT_RESPONSE_MOCK[0].id]: PRODUCT_RESPONSE_MOCK[0] },
    ids: [PRODUCT_RESPONSE_MOCK[0].id],
    nextPage: null,
    prevPage: null,
    total: PRODUCT_RESPONSE_MOCK.length,
    loading: false,
    loaded: true,
    error: undefined,
  }),
}

describe('GIVEN: ProductsSelectors', () => {
  describe('WHEN: selectProductsState', () => {
    const result = ProductsSelectors.selectProductsState(INITIAL_STATE)
    it('THEN: should return the products state', () => {
      expect(result).toEqual(INITIAL_STATE.products)
    })
  })

  describe('WHEN: selectProductsError', () => {
    const result = ProductsSelectors.selectProductsError(INITIAL_STATE)
    it('THEN: should return the products error', () => {
      expect(result).toEqual(INITIAL_STATE.products.error)
    })
  })

  describe('WHEN: selectProducts', () => {
    const result = ProductsSelectors.selectProducts(INITIAL_STATE)
    it('THEN: should return the products', () => {
      expect(result).toEqual([PRODUCT_RESPONSE_MOCK[0]])
    })
  })

  describe('WHEN: selectProductsLoading', () => {
    const result = ProductsSelectors.selectProductsLoading(INITIAL_STATE)
    it('THEN: should return the products loading', () => {
      expect(result).toEqual(INITIAL_STATE.products.loading)
    })
  })

  describe('WHEN: selectProductsLoaded', () => {
    const result = ProductsSelectors.selectProductsLoaded(INITIAL_STATE)
    it('THEN: should return the products loaded', () => {
      expect(result).toEqual(INITIAL_STATE.products.loaded)
    })
  })

  describe('WHEN: selectProductsNextPage', () => {
    const result = ProductsSelectors.selectProductsNextPage(INITIAL_STATE)
    it('THEN: should return the products next page', () => {
      expect(result).toEqual(INITIAL_STATE.products.nextPage)
    })
  })

  describe('WHEN: selectProductsPrevPage', () => {
    const result = ProductsSelectors.selectProductsPrevPage(INITIAL_STATE)
    it('THEN: should return the products prev page', () => {
      expect(result).toEqual(INITIAL_STATE.products.prevPage)
    })
  })

  describe('WHEN: selectProductsTotalItems', () => {
    const result = ProductsSelectors.selectProductsTotalItems(INITIAL_STATE)
    it('THEN: should return the products total items', () => {
      expect(result).toEqual(INITIAL_STATE.products.total)
    })
  })
})
