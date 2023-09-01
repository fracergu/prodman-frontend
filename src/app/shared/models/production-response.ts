import { TaskStatus } from './task-response.model'

export interface ProductionResponse {
  id: number
  timestamp: Date
  quantityCompleted: number
  subtask: Subtask
}

interface Subtask {
  id: number
  quantity: number
  order: number
  status: TaskStatus
  product: Product
  task: Task
}

interface Product {
  id: number
  name: string
  reference?: string
}

interface Task {
  id: number
  status: TaskStatus
  user: User
}

interface User {
  id: number
  name: string
  lastName: string
}
