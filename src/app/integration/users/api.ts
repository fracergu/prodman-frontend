import { AuthCredentials } from '@shared/models/auth-credentials.model'
import { PaginatedResponse } from '@shared/models/paginated-response'
import {
  UserRequest,
  UserSearchParameters,
} from '@shared/models/user-request.model'
import { UserResponse } from '@shared/models/user-response.model'
import { Observable } from 'rxjs'

export interface UsersServiceIntegrationApi {
  getUsers(
    params: UserSearchParameters,
  ): Observable<PaginatedResponse<UserResponse>>
  createUser(user: UserRequest): Observable<void>
  updateUser(user: UserRequest): Observable<UserResponse>
  updateUserCredentials(
    id: number,
    credentials: AuthCredentials,
  ): Observable<UserResponse>
}
