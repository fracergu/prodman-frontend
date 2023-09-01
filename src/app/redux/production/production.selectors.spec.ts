import { AppState } from '@redux/app.state'
import { initialAppStateMock } from '@redux/app.state.mock'
import { productionAdapter } from './production.state'
import * as ProductionSelectors from './production.selectors'

import { PRODUCTION_RESPONSE_MOCK } from '@mocks/production.mock'

const INITIAL_STATE: AppState = {
  ...initialAppStateMock,
  production: productionAdapter.getInitialState({
    entities: { [PRODUCTION_RESPONSE_MOCK[0].id]: PRODUCTION_RESPONSE_MOCK[0] },
    ids: [PRODUCTION_RESPONSE_MOCK[0].id],
    prevPage: null,
    nextPage: null,
    total: 1,
    loading: false,
    loaded: true,
    error: undefined,
  }),
}

describe('GIVEN: ProductionSelectors', () => {
  describe('WHEN: selectProductionState', () => {
    const result = ProductionSelectors.selectProductionState(INITIAL_STATE)
    it('THEN: should return the production state', () => {
      expect(result).toEqual(INITIAL_STATE.production)
    })
  })

  describe('WHEN: selectProductionError', () => {
    const result = ProductionSelectors.selectProductionError(INITIAL_STATE)
    it('THEN: should return the production error', () => {
      expect(result).toEqual(INITIAL_STATE.production.error)
    })
  })

  describe('WHEN: selectProduction', () => {
    const result = ProductionSelectors.selectProduction(INITIAL_STATE)
    it('THEN: should return the production', () => {
      expect(result).toEqual([PRODUCTION_RESPONSE_MOCK[0]])
    })
  })

  describe('WHEN: selectProductionLoading', () => {
    const result = ProductionSelectors.selectProductionLoading(INITIAL_STATE)
    it('THEN: should return the production loading', () => {
      expect(result).toEqual(INITIAL_STATE.production.loading)
    })
  })

  describe('WHEN: selectProductionLoaded', () => {
    const result = ProductionSelectors.selectProductionLoaded(INITIAL_STATE)
    it('THEN: should return the production loaded', () => {
      expect(result).toEqual(INITIAL_STATE.production.loaded)
    })
  })

  describe('WHEN: selectProductionNextPage', () => {
    const result = ProductionSelectors.selectProductionNextPage(INITIAL_STATE)
    it('THEN: should return the production nextPage', () => {
      expect(result).toEqual(INITIAL_STATE.production.nextPage)
    })
  })

  describe('WHEN: selectProductionPrevPage', () => {
    const result = ProductionSelectors.selectProductionPrevPage(INITIAL_STATE)
    it('THEN: should return the production prevPage', () => {
      expect(result).toEqual(INITIAL_STATE.production.prevPage)
    })
  })

  describe('WHEN: selectProductionTotalItems', () => {
    const result = ProductionSelectors.selectProductionTotalItems(INITIAL_STATE)
    it('THEN: should return the production total', () => {
      expect(result).toEqual(INITIAL_STATE.production.total)
    })
  })

  describe('WHEN: selectProductionOverview', () => {
    const result = ProductionSelectors.selectProductionOverview(INITIAL_STATE)
    it('THEN: should return the production overview', () => {
      expect(result).toEqual(INITIAL_STATE.production.overview)
    })
  })
})
