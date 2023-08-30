import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthCredentials } from '@shared/models/auth-credentials.model'
import { PaginatedResponse } from '@shared/models/paginated-response'
import {
  UserRequest,
  UserSearchParameters,
} from '@shared/models/user-request.model'
import { UserResponse } from '@shared/models/user-response.model'
import { httpParamsGenerator } from '@shared/utils/http-params-generator'
import { Observable } from 'rxjs'

import { Api } from '../api'
import { UsersServiceIntegrationApi } from './api'

@Injectable({
  providedIn: 'root',
})
export class UsersService implements UsersServiceIntegrationApi {
  constructor(
    private _api: Api,
    private _http: HttpClient,
  ) {}

  getUsers(
    params: UserSearchParameters,
  ): Observable<PaginatedResponse<UserResponse>> {
    return this._http.get<PaginatedResponse<UserResponse>>(
      `${this._api.usersUrl}`,
      {
        params: httpParamsGenerator(params),
      },
    )
  }

  createUser(user: UserRequest): Observable<void> {
    return this._http.post<void>(`${this._api.usersUrl}`, user)
  }
  updateUser(user: UserRequest): Observable<UserResponse> {
    return this._http.put<UserResponse>(
      `${this._api.usersUrl}/${user.id}`,
      user,
    )
  }
  updateUserCredentials(
    id: number,
    credentials: AuthCredentials,
  ): Observable<UserResponse> {
    return this._http.put<UserResponse>(
      `${this._api.usersUrl}/${id}/credentials`,
      credentials,
    )
  }
}
