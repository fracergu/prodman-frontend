import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { ProductionReportResponse } from '@shared/models/production-report-response'
import { ProductionResponse } from '@shared/models/production-response'

export interface ProductionState extends EntityState<ProductionResponse> {
  nextPage?: number | null
  prevPage?: number | null
  total?: number
  overview?: ProductionReportResponse
  loading: boolean
  loaded: boolean
  error?: string
}

export const productionAdapter: EntityAdapter<ProductionResponse> =
  createEntityAdapter<ProductionResponse>({
    selectId: (production: ProductionResponse) => production.id,
  })

export const initialProductionState: ProductionState =
  productionAdapter.getInitialState({
    loading: false,
    loaded: false,
  })
