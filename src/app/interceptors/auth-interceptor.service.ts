import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, map, Observable, throwError } from 'rxjs'

const TIMEOUT_CODE = 440

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map(res => {
        return res
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = ''
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`
        } else {
          this._handleLoginTimeoutError(error)
          errorMsg = `Error Code: ${error.status},  Message: ${error.error.message}`
        }
        return throwError(() => new Error(errorMsg))
      }),
    )
  }

  private _handleLoginTimeoutError(error: HttpErrorResponse) {
    if (error.status === TIMEOUT_CODE) {
      this.router.navigate(['/login'])
    }
  }
}
