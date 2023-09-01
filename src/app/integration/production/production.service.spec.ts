import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { ProductionSearchParameters } from '@shared/models/production-request.model'
import { httpParamsGenerator } from '@shared/utils/http-params-generator'
import { Api } from '../api'
import { ProductionService } from './production.service'
import { ProductionReportSearchParameters } from '@shared/models/production-report-request.model'

describe('GIVEN: ProductionService', () => {
  let service: ProductionService
  let httpMock: HttpTestingController
  let api: Api

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductionService,
        {
          provide: Api,
          useValue: {
            productionUrl: 'http://localhost/api/production',
          },
        },
      ],
    })

    service = TestBed.inject(ProductionService)
    httpMock = TestBed.inject(HttpTestingController)
    api = TestBed.inject(Api)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('THEN: should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('WHEN calling the getProduction method', () => {
    it('THEN: should execute a GET request with search parameters', () => {
      const params: ProductionSearchParameters = { page: 1, limit: 10 }

      service.getProduction(params).subscribe()

      const req = httpMock.expectOne(
        req =>
          req.url === `${api.productionUrl}` &&
          req.params.toString() === httpParamsGenerator(params).toString(),
      )

      expect(req.request.method).toBe('GET')
    })
  })

  describe('WHEN calling the getProductionReport method', () => {
    it('THEN: should execute a GET request with report search parameters', () => {
      const params: ProductionReportSearchParameters = {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      }

      service.getProductionReport(params).subscribe()

      const req = httpMock.expectOne(
        req =>
          req.url === `${api.productionUrl}/report` &&
          req.params.toString() === httpParamsGenerator(params).toString(),
      )

      expect(req.request.method).toBe('GET')
    })
  })
})
