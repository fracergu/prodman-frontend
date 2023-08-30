import { AppConfigurationResponse } from '@shared/models/app-configuration-response.model'
import { Observable } from 'rxjs'

export interface ConfigServiceIntegrationApi {
  getConfiguration(): Observable<AppConfigurationResponse>
  updateConfiguration(
    config: AppConfigurationResponse,
  ): Observable<AppConfigurationResponse>
}
