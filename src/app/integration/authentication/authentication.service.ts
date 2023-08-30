import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthCredentials } from '@shared/models/auth-credentials.model'
import { RegisterRequest } from '@shared/models/register-request.model'
import { Observable } from 'rxjs'

import { Api } from '../api'
import { IntegrationModule } from '../integration.module'
import { AuthenticationServiceIntegrationApi } from './api'

@Injectable({
  providedIn: IntegrationModule,
})
export class AuthenticationService
  implements AuthenticationServiceIntegrationApi
{
  constructor(
    private _http: HttpClient,
    private _api: Api,
  ) {}

  login(credentials: AuthCredentials, rememberMe?: boolean): Observable<null> {
    const headers = new HttpHeaders().append(
      'Authorization',
      `Basic ${btoa(credentials.username + ':' + credentials.password)}`,
    )
    return this._http.post<null>(
      `${this._api.authUrl}/login`,
      { rememberMe },
      {
        headers,
      },
    )
  }
  logout(): Observable<null> {
    return this._http.delete<null>(`${this._api.authUrl}/logout`)
  }
  register(data: RegisterRequest): Observable<null> {
    return this._http.post<null>(`${this._api.authUrl}/register`, data)
  }

  checkSession(): Observable<null> {
    return this._http.get<null>(`${this._api.authUrl}/session`)
  }
}
