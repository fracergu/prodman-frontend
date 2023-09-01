import { AuthCredentials } from '@shared/models/auth-credentials.model'
import { RegisterRequest } from '@shared/models/register-request.model'
import { Observable } from 'rxjs'

export interface AuthenticationServiceIntegrationApi {
  login(
    authCredentials: AuthCredentials,
    rememberMe?: boolean,
  ): Observable<void>
  logout(): Observable<null>
  register(data: RegisterRequest): Observable<null>
  checkSession(): Observable<null>
}
