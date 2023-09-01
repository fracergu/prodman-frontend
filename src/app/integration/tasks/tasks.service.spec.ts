import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import {
  TaskRequest,
  TasksSearchParameters,
} from '@shared/models/task-request.model'
import { httpParamsGenerator } from '@shared/utils/http-params-generator'
import { Api } from '../api'
import { TasksService } from './tasks.service'

describe('GIVEN: TasksService', () => {
  let service: TasksService
  let httpMock: HttpTestingController
  let api: Api

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TasksService,
        {
          provide: Api,
          useValue: {
            tasksUrl: 'http://localhost/api/tasks',
          },
        },
      ],
    })

    service = TestBed.inject(TasksService)
    httpMock = TestBed.inject(HttpTestingController)
    api = TestBed.inject(Api)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('THEN: should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('WHEN calling the getTasks method', () => {
    it('THEN: should execute a GET request with search parameters', () => {
      const params: TasksSearchParameters = { page: 1, limit: 10 }

      service.getTasks(params).subscribe()

      const req = httpMock.expectOne(
        req =>
          req.url === `${api.tasksUrl}` &&
          req.params.toString() === httpParamsGenerator(params).toString(),
      )

      expect(req.request.method).toBe('GET')
    })
  })

  describe('WHEN calling the createTask method', () => {
    it('THEN: should execute a POST request with the new task', () => {
      const task: TaskRequest = {
        id: 1,
        notes: 'Task1',
      }

      service.createTask(task).subscribe()

      const req = httpMock.expectOne(`${api.tasksUrl}`)
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual(task)
    })
  })

  describe('WHEN calling the updateTask method', () => {
    it('THEN: should execute a PUT request with the updated task', () => {
      const task: TaskRequest = {
        id: 1,
        notes: 'Updated Task1',
      }

      service.updateTask(task).subscribe()

      const req = httpMock.expectOne(`${api.tasksUrl}/${task.id}`)
      expect(req.request.method).toBe('PUT')
      expect(req.request.body).toEqual(task)
    })
  })

  describe('WHEN calling the deleteTask method', () => {
    it('THEN: should execute a DELETE request for the task ID', () => {
      const id = 1

      service.deleteTask(id).subscribe()

      const req = httpMock.expectOne(`${api.tasksUrl}/${id}`)
      expect(req.request.method).toBe('DELETE')
    })
  })
})
