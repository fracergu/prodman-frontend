import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { AppConfigurationResponse } from '@shared/models/app-configuration-response.model'
import { Api } from '../api'
import { ConfigService } from './config.service'

describe('GIVEN: ConfigService', () => {
  let service: ConfigService
  let httpMock: HttpTestingController
  let api: Api

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConfigService,
        {
          provide: Api,
          useValue: {
            configUrl: 'http://localhost/api/config',
          },
        },
      ],
    })

    service = TestBed.inject(ConfigService)
    httpMock = TestBed.inject(HttpTestingController)
    api = TestBed.inject(Api)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('THEN: should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('WHEN calling the getConfiguration method', () => {
    it('THEN: should execute a GET request', () => {
      service.getConfiguration().subscribe()

      const req = httpMock.expectOne(`${api.configUrl}`)
      expect(req.request.method).toBe('GET')
    })
  })

  describe('WHEN calling the updateConfiguration method', () => {
    it('THEN: should execute a PUT request with the new configuration', () => {
      const config: AppConfigurationResponse = {
        registerEnabled: true,
        workerAutoTimeout: 1000,
        workerGetNextSubtask: true,
      }

      service.updateConfiguration(config).subscribe()

      const req = httpMock.expectOne(`${api.configUrl}`)
      expect(req.request.method).toBe('PUT')
      expect(req.request.body).toEqual(config)
    })
  })
})
