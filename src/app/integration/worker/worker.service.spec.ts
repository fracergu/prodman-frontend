import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { CompleteSubtaskRequest } from '@shared/models/complete-subtask-request.model'
import { Api } from '../api'
import { WorkerService } from './worker.service'

describe('GIVEN: WorkerService', () => {
  let service: WorkerService
  let httpMock: HttpTestingController
  let api: Api

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WorkerService,
        {
          provide: Api,
          useValue: {
            workerUrl: 'http://localhost/api/worker',
          },
        },
      ],
    })

    service = TestBed.inject(WorkerService)
    httpMock = TestBed.inject(HttpTestingController)
    api = TestBed.inject(Api)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('THEN: should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('WHEN calling the getTask method', () => {
    it('THEN: should execute a GET request to fetch the task', () => {
      service.getTask().subscribe()

      const req = httpMock.expectOne(`${api.workerUrl}/task`)
      expect(req.request.method).toBe('GET')
    })
  })

  describe('WHEN calling the getActiveWorkers method', () => {
    it('THEN: should execute a GET request to fetch the active workers', () => {
      service.getActiveWorkers().subscribe()

      const req = httpMock.expectOne(`${api.workerUrl}/active`)
      expect(req.request.method).toBe('GET')
    })
  })

  describe('WHEN calling the completeTask method', () => {
    it('THEN: should execute a POST request to complete the subtask', () => {
      const data: CompleteSubtaskRequest = {
        id: 1,
        quantityCompleted: 10,
      }

      service.completeTask(data).subscribe()

      const req = httpMock.expectOne(
        `${api.workerUrl}/completeSubtask/${data.id}`,
      )
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual({
        quantityCompleted: data.quantityCompleted,
      })
    })
  })
})
