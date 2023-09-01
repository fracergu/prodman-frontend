import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { AuthCredentials } from '@shared/models/auth-credentials.model'
import {
  UserRequest,
  UserSearchParameters,
} from '@shared/models/user-request.model'
import { httpParamsGenerator } from '@shared/utils/http-params-generator'
import { Api } from '../api'
import { UsersService } from './users.service'

describe('GIVEN: UsersService', () => {
  let service: UsersService
  let httpMock: HttpTestingController
  let api: Api

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsersService,
        {
          provide: Api,
          useValue: {
            usersUrl: 'http://localhost/api/users',
          },
        },
      ],
    })

    service = TestBed.inject(UsersService)
    httpMock = TestBed.inject(HttpTestingController)
    api = TestBed.inject(Api)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('THEN: should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('WHEN calling the getUsers method', () => {
    it('THEN: should execute a GET request with search parameters', () => {
      const params: UserSearchParameters = { page: 1, limit: 10 }

      service.getUsers(params).subscribe()

      const req = httpMock.expectOne(
        req =>
          req.url === `${api.usersUrl}` &&
          req.params.toString() === httpParamsGenerator(params).toString(),
      )

      expect(req.request.method).toBe('GET')
    })
  })

  describe('WHEN calling the createUser method', () => {
    it('THEN: should execute a POST request with the new user', () => {
      const user: UserRequest = {
        id: 1,
        username: 'User1',
      }

      service.createUser(user).subscribe()

      const req = httpMock.expectOne(`${api.usersUrl}`)
      expect(req.request.method).toBe('POST')
      expect(req.request.body).toEqual(user)
    })
  })

  describe('WHEN calling the updateUser method', () => {
    it('THEN: should execute a PUT request with the updated user', () => {
      const user: UserRequest = {
        id: 1,
        username: 'UpdatedUser1',
      }

      service.updateUser(user).subscribe()

      const req = httpMock.expectOne(`${api.usersUrl}/${user.id}`)
      expect(req.request.method).toBe('PUT')
      expect(req.request.body).toEqual(user)
    })
  })

  describe('WHEN calling the updateUserCredentials method', () => {
    it('THEN: should execute a PUT request with the updated credentials', () => {
      const id = 1
      const credentials: AuthCredentials = {
        username: 'newUsername',
        password: 'newPassword',
      }

      service.updateUserCredentials(id, credentials).subscribe()

      const req = httpMock.expectOne(`${api.usersUrl}/${id}/credentials`)
      expect(req.request.method).toBe('PUT')
      expect(req.request.body).toEqual(credentials)
    })
  })
})
