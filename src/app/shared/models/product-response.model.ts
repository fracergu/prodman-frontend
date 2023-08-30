export interface Category {
  id: number
  name: string
  description: string
}

export interface Component {
  quantity: number
  product: ProductComponent
}

export type ProductComponent = Omit<
  ProductResponse,
  'categories' | 'components'
>

export interface ProductResponse {
  id: number
  name: string
  description: string
  price: number
  reference: string
  active: boolean
  image: string | null
  categories: Category[]
  components: Component[]
  createdAt?: Date
  updatedAt?: Date
}
