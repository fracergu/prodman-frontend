import { AuthState } from './auth/auth.state'
import { CategoriesState } from './categories/categories.state'
import { ConfigState } from './config/config.state'
import { ProductionState } from './production/production.state'
import { ProductsState } from './products/products.state'
import { TasksState } from './tasks/tasks.state'
import { UsersState } from './users/users.state'
import { WorkerState } from './worker/worker.state'

export interface AppState {
  auth: AuthState
  users: UsersState
  categories: CategoriesState
  products: ProductsState
  tasks: TasksState
  config: ConfigState
  worker: WorkerState
  production: ProductionState
}
