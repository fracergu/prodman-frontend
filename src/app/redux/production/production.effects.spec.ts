import { ReplaySubject, of, throwError } from 'rxjs'
import { Action } from '@ngrx/store'
import { ProductionEffects } from './production.effects'
import { ProductionService } from '@integration/production/production.service'
import { MessageService } from 'primeng/api'
import {
  PRODUCTION_REPORT_RESPONSE_MOCK,
  PRODUCTION_RESPONSE_MOCK,
} from '@mocks/production.mock'
import { PaginatedResponse } from '@shared/models/paginated-response'
import { ProductionResponse } from '@shared/models/production-response'
import { ProductionReportResponse } from '@shared/models/production-report-response'
import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { ProductionActions } from './production.actions'
import { ProductionSearchParameters } from '@shared/models/production-request.model'

describe('GIVEN: ProductionEffects', () => {
  let actions: ReplaySubject<Action>
  let effects: ProductionEffects
  let productionService: ProductionService
  let messageService: MessageService

  const productionMock: PaginatedResponse<ProductionResponse> = {
    data: PRODUCTION_RESPONSE_MOCK,
    total: 2,
    prevPage: null,
    nextPage: null,
  }

  const productionReportMock: ProductionReportResponse =
    PRODUCTION_REPORT_RESPONSE_MOCK

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductionEffects,
        provideMockActions(() => actions),
        {
          provide: ProductionService,
          useValue: {
            getProduction: () => of(productionMock),
            getProductionReport: () => of(productionReportMock),
          },
        },
        {
          provide: MessageService,
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    })

    effects = TestBed.inject(ProductionEffects)
    productionService = TestBed.inject(ProductionService)
    messageService = TestBed.inject(MessageService)
  })

  describe('loadProduction$', () => {
    it('should dispatch getProductionSuccess on successful getProduction', () => {
      actions = new ReplaySubject(1)
      actions.next(
        ProductionActions.loadProduction({
          params: {} as ProductionSearchParameters,
        }),
      )

      effects.loadProduction$.subscribe(action => {
        expect(action).toEqual(
          ProductionActions.loadProductionSuccess(productionMock),
        )
      })
    })

    it('should dispatch getProductionFailure on failed getProduction', () => {
      actions = new ReplaySubject(1)
      actions.next(
        ProductionActions.loadProduction({
          params: {} as ProductionSearchParameters,
        }),
      )

      jest
        .spyOn(productionService, 'getProduction')
        .mockReturnValueOnce(throwError(() => new Error('error')))

      effects.loadProduction$.subscribe(action => {
        expect(action).toEqual(
          ProductionActions.loadProductionFailure({
            error: 'Error',
          }),
        )
      })
    })
  })

  describe('loadOverview$', () => {
    it('should dispatch getOverviewSuccess on successful getOverview', () => {
      actions = new ReplaySubject(1)
      actions.next(ProductionActions.loadOverview({ params: {} }))

      effects.loadOverview$.subscribe(action => {
        expect(action).toEqual(
          ProductionActions.loadOverviewSuccess({
            payload: PRODUCTION_REPORT_RESPONSE_MOCK,
          }),
        )
      })
    })

    it('should dispatch getOverviewFailure on failed getOverview', () => {
      actions = new ReplaySubject(1)
      actions.next(ProductionActions.loadOverview({ params: {} }))

      jest
        .spyOn(productionService, 'getProductionReport')
        .mockReturnValueOnce(throwError(() => new Error('error')))

      effects.loadOverview$.subscribe(action => {
        expect(action).toEqual(
          ProductionActions.loadOverviewFailure({
            error: 'Error',
          }),
        )
      })
    })
  })
})
