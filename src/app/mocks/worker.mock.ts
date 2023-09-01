import { ActiveWorkersResponse } from '@shared/models/active-workers-response'
import { WorkerTaskResponse } from '@shared/models/worker-task-response'

export const WORKER_TASK_RESPONSE_MOCK: WorkerTaskResponse = {
  id: 4,
  notes: 'Task 0 notes',
  createdAt: new Date('2023-08-28T13:48:51.195Z'),
  updatedAt: new Date('2023-08-28T14:00:40.084Z'),
  status: 'pending',
  userId: 8,
  subtasks: [
    {
      id: 22,
      quantity: 8,
      order: 0,
      status: 'pending',
      product: { id: 32, name: 'Product 31' },
      subtaskEvents: [],
    },
  ],
}
export const ACTIVE_WORKERS_RESPONSE_MOCK: ActiveWorkersResponse = [
  { id: 3, username: 'sofiaperez39', name: 'Sofia', lastName: 'Perez' },
  { id: 4, username: 'jorgemoreno30', name: 'Jorge', lastName: 'Moreno' },
  { id: 5, username: 'anaalvarez10', name: 'Ana', lastName: 'Alvarez' },
]
