import { PaginatedResponse } from '@shared/models/paginated-response'
import { ProductionResponse } from '@shared/models/production-response'
import { ProductionActions } from './production.actions'
import { productionReducer } from './production.reducer'
import { initialProductionState, ProductionState } from './production.state'
import {
  PRODUCTION_REPORT_RESPONSE_MOCK,
  PRODUCTION_RESPONSE_MOCK,
} from '@mocks/production.mock'

describe('GIVEN: ProductionReducer', () => {
  let someInitialState: ProductionState

  const mockPaginatedResponse: PaginatedResponse<ProductionResponse> = {
    data: PRODUCTION_RESPONSE_MOCK,
    nextPage: null,
    prevPage: null,
    total: 2,
  }

  beforeEach(() => {
    someInitialState = {
      ...initialProductionState,
    }
  })

  it('should return loading state after loadProduction action', () => {
    const newState = productionReducer(
      someInitialState,
      ProductionActions.loadProduction({ params: { page: 1, limit: 2 } }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state and updated productions after loadProductionSuccess action', () => {
    const newState = productionReducer(
      someInitialState,
      ProductionActions.loadProductionSuccess(mockPaginatedResponse),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
    expect(newState.nextPage).toBe(null)
    expect(newState.prevPage).toBe(null)
    expect(newState.total).toBe(2)
  })

  it('should return error state after loadProductionFailure action', () => {
    const newState = productionReducer(
      someInitialState,
      ProductionActions.loadProductionFailure({ error: 'Error' }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toBe('Error')
  })

  it('should return loading state after loadOverview action', () => {
    const newState = productionReducer(
      someInitialState,
      ProductionActions.loadOverview({ params: {} }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state and updated overview after loadOverviewSuccess action', () => {
    const newState = productionReducer(
      someInitialState,
      ProductionActions.loadOverviewSuccess({
        payload: PRODUCTION_REPORT_RESPONSE_MOCK,
      }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
    expect(newState.overview).toEqual(PRODUCTION_REPORT_RESPONSE_MOCK)
  })

  it('should return error state after loadOverviewFailure action', () => {
    const newState = productionReducer(
      someInitialState,
      ProductionActions.loadOverviewFailure({ error: 'Error' }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toBe('Error')
    expect(newState.overview).toBeUndefined()
  })
})
