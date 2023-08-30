import { PaginatedResponse } from '@shared/models/paginated-response'
import {
  ProductRequest,
  ProductSearchParameters,
} from '@shared/models/product-request.model'
import { ProductResponse } from '@shared/models/product-response.model'
import { Observable } from 'rxjs'

export interface ProductsServiceIntegrationApi {
  getProducts(
    params: ProductSearchParameters,
  ): Observable<PaginatedResponse<ProductResponse>>
  createProduct(product: ProductRequest): Observable<ProductResponse>
  updateProduct(product: ProductRequest): Observable<ProductResponse>
  deleteProduct(id: number): Observable<ProductResponse>
}
