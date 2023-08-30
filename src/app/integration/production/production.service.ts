import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { PaginatedResponse } from '@shared/models/paginated-response'
import { ProductionReportSearchParameters } from '@shared/models/production-report-request.model'
import { ProductionReportResponse } from '@shared/models/production-report-response'
import { ProductionSearchParameters } from '@shared/models/production-request.model'
import { ProductionResponse } from '@shared/models/production-response'
import { httpParamsGenerator } from '@shared/utils/http-params-generator'
import { Observable } from 'rxjs'

import { Api } from '../api'
import { ProductionServiceIntegrationApi } from './api'

@Injectable({
  providedIn: 'root',
})
export class ProductionService implements ProductionServiceIntegrationApi {
  constructor(
    private _api: Api,
    private _http: HttpClient,
  ) {}

  getProduction(
    params: ProductionSearchParameters,
  ): Observable<PaginatedResponse<ProductionResponse>> {
    return this._http.get<PaginatedResponse<ProductionResponse>>(
      `${this._api.productionUrl}`,
      {
        params: httpParamsGenerator(params),
      },
    )
  }

  getProductionReport(
    params: ProductionReportSearchParameters,
  ): Observable<ProductionReportResponse> {
    return this._http.get<ProductionReportResponse>(
      `${this._api.productionUrl}/report`,
      {
        params: httpParamsGenerator(params),
      },
    )
  }
}
