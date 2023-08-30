import { CategoriesSearchParameters } from '@shared/models/product-request.model'
import { Category } from '@shared/models/product-response.model'
import { Observable } from 'rxjs'

export interface CategoriesServiceIntegrationApi {
  getCategories(params: CategoriesSearchParameters): Observable<Category[]>
  createCategory(category: Category): Observable<Category>
  updateCategory(category: Partial<Category>): Observable<Category>
  deleteCategory(id: number): Observable<Category>
}
