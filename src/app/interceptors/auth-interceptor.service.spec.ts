import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing'
import {
  HttpClient,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthInterceptorService } from './auth-interceptor.service'

describe('GIVEN: AuthInterceptorService', () => {
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ],
    })

    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
    router = TestBed.inject(Router)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('THEN: should catch 440 error and redirect to login', () => {
    const errorMessage = 'timeout'
    const url = '/test'

    jest.spyOn(router, 'navigate')

    httpClient.get(url).subscribe(
      () => fail('should have failed with the 440 error'),
      (error: HttpErrorResponse) => {
        expect(error.message).toContain('440')
      },
    )

    const req: TestRequest = httpTestingController.expectOne(url)
    req.flush({ message: errorMessage }, { status: 440, statusText: 'timeout' })

    expect(router.navigate).toHaveBeenCalledWith(['/login'])
  })

  it('THEN: should handle non-440 error normally', () => {
    const errorMessage = 'server error'
    const url = '/test'

    httpClient.get(url).subscribe(
      () => fail('should have failed with the 500 error'),
      (error: HttpErrorResponse) => {
        expect(error.message).toContain('500')
      },
    )

    const req: TestRequest = httpTestingController.expectOne(url)
    req.flush(
      { message: errorMessage },
      { status: 500, statusText: 'server error' },
    )
  })

  it('THEN: should handle ErrorEvent', () => {
    const errorMessage = 'network error'
    const url = '/test'

    httpClient.get(url).subscribe(
      () => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.message).toContain(errorMessage)
      },
    )

    const mockError = new ErrorEvent('Network error', {
      message: errorMessage,
    })

    const req: TestRequest = httpTestingController.expectOne(url)
    req.error(mockError)
  })
})
