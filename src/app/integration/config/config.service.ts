import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AppConfigurationResponse } from '@shared/models/app-configuration-response.model'
import { Observable } from 'rxjs'

import { Api } from '../api'
import { ConfigServiceIntegrationApi } from './api'

@Injectable({
  providedIn: 'root',
})
export class ConfigService implements ConfigServiceIntegrationApi {
  constructor(
    private _api: Api,
    private _http: HttpClient,
  ) {}
  getConfiguration(): Observable<AppConfigurationResponse> {
    return this._http.get<AppConfigurationResponse>(this._api.configUrl)
  }
  updateConfiguration(
    config: AppConfigurationResponse,
  ): Observable<AppConfigurationResponse> {
    return this._http.put<AppConfigurationResponse>(this._api.configUrl, config)
  }
}
