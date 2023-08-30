import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { Category } from '@shared/models/product-response.model'

export interface CategoriesState extends EntityState<Category> {
  loading: boolean
  loaded: boolean
  error?: string
}

export const categoriesAdapter: EntityAdapter<Category> =
  createEntityAdapter<Category>({
    selectId: (category: Category) => category.id,
  })

export const initialCategoryState: CategoriesState =
  categoriesAdapter.getInitialState({
    loading: false,
    loaded: false,
  })
