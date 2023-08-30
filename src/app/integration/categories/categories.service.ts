import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  CategoriesSearchParameters,
  CategoryRequest,
} from '@shared/models/product-request.model'
import { Category } from '@shared/models/product-response.model'
import { httpParamsGenerator } from '@shared/utils/http-params-generator'
import { Observable } from 'rxjs'

import { Api } from '../api'
import { CategoriesServiceIntegrationApi } from './api'

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements CategoriesServiceIntegrationApi {
  constructor(
    private _api: Api,
    private _http: HttpClient,
  ) {}

  getCategories(params: CategoriesSearchParameters): Observable<Category[]> {
    return this._http.get<Category[]>(`${this._api.categoriesUrl}`, {
      params: httpParamsGenerator(params),
    })
  }
  createCategory(category: CategoryRequest): Observable<Category> {
    return this._http.post<Category>(`${this._api.categoriesUrl}`, category)
  }

  updateCategory(category: CategoryRequest): Observable<Category> {
    return this._http.put<Category>(
      `${this._api.categoriesUrl}/${category.id}`,
      category,
    )
  }

  deleteCategory(id: number): Observable<Category> {
    return this._http.delete<Category>(`${this._api.categoriesUrl}/${id}`)
  }
}
