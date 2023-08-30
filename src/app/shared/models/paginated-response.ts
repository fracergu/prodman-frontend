export interface PaginatedResponse<T> {
  data: T[]
  nextPage?: number | null
  prevPage?: number | null
  total: number
}
