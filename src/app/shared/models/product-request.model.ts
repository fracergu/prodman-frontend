import { components } from '@integration/api-schemas'

export interface ProductSearchParameters {
  page: number
  limit: number
  search?: string
  category?: number
  inactive?: boolean
}

export interface CategoriesSearchParameters {
  search?: string
}

export type ProductRequest = components['schemas']['ProductRequest'] & {
  id?: number
}

export type CategoryRequest = components['schemas']['CategoryRequest'] & {
  id?: number
}
