export interface WorkerTaskResponse {
  id: number
  notes: string
  createdAt: Date
  updatedAt: Date
  status: string
  userId: number
  subtasks: WorkerTaskSubtask[]
}

export interface WorkerTaskSubtask {
  id: number
  quantity: number
  order: number
  status: string
  product: WorkerTaskProduct
  subtaskEvents: WorkerTaskSubtaskEvent[]
}

interface WorkerTaskSubtaskEvent {
  id: number
  timetamp: Date
  quantityCompleted: number
}

interface WorkerTaskProduct {
  id: number
  name: string
}
