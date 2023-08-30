import { PaginatedResponse } from '@shared/models/paginated-response'
import { ProductionReportSearchParameters } from '@shared/models/production-report-request.model'
import { ProductionReportResponse } from '@shared/models/production-report-response'
import { ProductionSearchParameters } from '@shared/models/production-request.model'
import { ProductionResponse } from '@shared/models/production-response'
import { Observable } from 'rxjs'

export interface ProductionServiceIntegrationApi {
  getProduction(
    params: ProductionSearchParameters,
  ): Observable<PaginatedResponse<ProductionResponse>>

  getProductionReport(
    params: ProductionReportSearchParameters,
  ): Observable<ProductionReportResponse>
}
