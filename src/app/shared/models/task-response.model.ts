export interface TaskResponse {
  id: number
  createdAt: Date
  updatedAt: Date
  notes: string
  status: TaskStatus
  user: User
  subtasks: Subtask[]
  percentageCompleted: number
}

export enum TaskStatus {
  Pending = 'pending',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export interface Subtask {
  id: number
  order: number
  quantity: number
  status: TaskStatus
  product: Product
  subtaskEvents: SubtaskEvent[]
}

export interface Product {
  id: number
  name: string
}

export interface SubtaskEvent {
  id: number
  timestamp: Date
  quantityCompleted: number
  subtaskId: number
}

export interface User {
  id: number
  name: string
  lastName: string
}
