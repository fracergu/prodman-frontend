import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { PaginatedResponse } from '@shared/models/paginated-response'
import {
  ProductRequest,
  ProductSearchParameters,
} from '@shared/models/product-request.model'
import { ProductResponse } from '@shared/models/product-response.model'
import { httpParamsGenerator } from '@shared/utils/http-params-generator'
import { Observable } from 'rxjs'

import { Api } from '../api'
import { ProductsServiceIntegrationApi } from './api'

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements ProductsServiceIntegrationApi {
  constructor(
    private _api: Api,
    private _http: HttpClient,
  ) {}

  getProducts(
    params: ProductSearchParameters,
  ): Observable<PaginatedResponse<ProductResponse>> {
    return this._http.get<PaginatedResponse<ProductResponse>>(
      `${this._api.productsUrl}`,
      {
        params: httpParamsGenerator(params),
      },
    )
  }

  createProduct(product: ProductRequest): Observable<ProductResponse> {
    return this._http.post<ProductResponse>(`${this._api.productsUrl}`, product)
  }
  updateProduct(product: ProductRequest): Observable<ProductResponse> {
    return this._http.put<ProductResponse>(
      `${this._api.productsUrl}/${product.id}`,
      product,
    )
  }
  deleteProduct(id: number): Observable<ProductResponse> {
    return this._http.delete<ProductResponse>(`${this._api.productsUrl}/${id}`)
  }
}
