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
  status: Status
  product: Product
  task: Task
}

interface Product {
  id: number
  name: string
}

enum Status {
  Completed = 'completed',
}

interface Task {
  id: number
  status: Status
  user: User
}

interface User {
  id: number
  name: string
  lastName: string
}
