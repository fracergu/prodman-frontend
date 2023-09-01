import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { AuthCredentials } from '@shared/models/auth-credentials.model'
import { RegisterRequest } from '@shared/models/register-request.model'
import { Api } from '../api'
import { AuthenticationService } from './authentication.service'

describe('GIVEN: AuthenticationService', () => {
  let service: AuthenticationService
  let httpMock: HttpTestingController
  let api: Api

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: Api, useValue: { authUrl: 'http://localhost/api/auth' } },
      ],
    })

    service = TestBed.inject(AuthenticationService)
    httpMock = TestBed.inject(HttpTestingController)
    api = TestBed.inject(Api)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('THEN: should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('WHEN calling the login method', () => {
    it('THEN: should execute a POST request', () => {
      const credentials: AuthCredentials = {
        username: 'username',
        password: 'password',
      }
      const rememberMe = true

      service.login(credentials, rememberMe).subscribe()

      const req = httpMock.expectOne(`${api.authUrl}/login`)
      expect(req.request.method).toEqual('POST')
      expect(req.request.headers.get('Authorization')).toEqual(
        'Basic ' + btoa('username:password'),
      )
      expect(req.request.body).toEqual({ rememberMe })
    })
  })

  describe('WHEN calling the logout method', () => {
    it('THEN: should execute a DELETE request', () => {
      service.logout().subscribe()

      const req = httpMock.expectOne(`${api.authUrl}/logout`)
      expect(req.request.method).toEqual('DELETE')
    })
  })

  describe('WHEN calling the register method', () => {
    it('THEN: should execute a POST request', () => {
      const data: RegisterRequest = {
        username: 'username',
        password: 'password',
      }

      service.register(data).subscribe()

      const req = httpMock.expectOne(`${api.authUrl}/register`)
      expect(req.request.method).toEqual('POST')
      expect(req.request.body).toEqual(data)
    })
  })

  describe('WHEN calling the checkSession method', () => {
    it('THEN: should execute a GET request', () => {
      service.checkSession().subscribe()

      const req = httpMock.expectOne(`${api.authUrl}/session`)
      expect(req.request.method).toEqual('GET')
    })
  })
})
