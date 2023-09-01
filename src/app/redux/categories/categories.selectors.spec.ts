import { AppState } from '@redux/app.state'
import { initialAppStateMock } from '@redux/app.state.mock'
import * as CategoriesSelectors from './categories.selectors'
import { CATEGORIES_RESPONSE_MOCK } from '@mocks/categories.mock'
import { categoriesAdapter } from './categories.state'

const INITIAL_STATE: AppState = {
  ...initialAppStateMock,
  categories: categoriesAdapter.getInitialState({
    entities: { [CATEGORIES_RESPONSE_MOCK[0].id]: CATEGORIES_RESPONSE_MOCK[0] },
    ids: [CATEGORIES_RESPONSE_MOCK[0].id],
    loading: false,
    loaded: true,
    error: undefined,
  }),
}

describe('GIVEN: CategoriesSelectors', () => {
  describe('WHEN: selectCategoriesState', () => {
    const result = CategoriesSelectors.selectCategoriesState(INITIAL_STATE)
    it('THEN: should return the categories state', () => {
      expect(result).toEqual(INITIAL_STATE.categories)
    })
  })

  describe('WHEN: selectCategoriesError', () => {
    const result = CategoriesSelectors.selectCategoriesError(INITIAL_STATE)
    it('THEN: should return the categories error', () => {
      expect(result).toEqual(INITIAL_STATE.categories.error)
    })
  })

  describe('WHEN: selectCategories', () => {
    const result = CategoriesSelectors.selectCategories(INITIAL_STATE)
    it('THEN: should return the categories', () => {
      expect(result).toEqual([CATEGORIES_RESPONSE_MOCK[0]])
    })
  })

  describe('WHEN: selectCategoriesLoading', () => {
    const result = CategoriesSelectors.selectCategoriesLoading(INITIAL_STATE)
    it('THEN: should return the categories loading', () => {
      expect(result).toEqual(INITIAL_STATE.categories.loading)
    })
  })

  describe('WHEN: selectCategoriesLoaded', () => {
    const result = CategoriesSelectors.selectCategoriesLoaded(INITIAL_STATE)
    it('THEN: should return the categories loaded', () => {
      expect(result).toEqual(INITIAL_STATE.categories.loaded)
    })
  })
})
