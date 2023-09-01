import { TaskResponse, TaskStatus } from '@shared/models/task-response.model'

export const TASK_RESPONSE_MOCK: TaskResponse[] = [
  {
    id: 1,
    createdAt: new Date('2023-08-28T13:48:51.195Z'),
    updatedAt: new Date('2023-08-28T14:00:40.084Z'),
    notes: 'Task 1 notes',
    status: TaskStatus.Completed,
    user: {
      id: 5,
      name: 'Ana',
      lastName: 'Alvarez',
    },
    subtasks: [
      {
        id: 5,
        order: 0,
        quantity: 2,
        status: TaskStatus.Completed,
        product: {
          id: 43,
          name: 'Product 35',
        },
        subtaskEvents: [
          {
            id: 1,
            timestamp: new Date('2023-08-28T13:58:44.563Z'),
            quantityCompleted: 1,
            subtaskId: 5,
          },
          {
            id: 2,
            timestamp: new Date('2023-08-28T13:58:51.006Z'),
            quantityCompleted: 1,
            subtaskId: 5,
          },
        ],
      },
      {
        id: 4,
        order: 1,
        quantity: 1,
        status: TaskStatus.Completed,
        product: {
          id: 20,
          name: 'Product 21',
        },
        subtaskEvents: [
          {
            id: 3,
            timestamp: new Date('2023-08-28T13:59:17.146Z'),
            quantityCompleted: 1,
            subtaskId: 4,
          },
        ],
      },
      {
        id: 3,
        order: 2,
        quantity: 3,
        status: TaskStatus.Completed,
        product: {
          id: 47,
          name: 'Product 47',
        },
        subtaskEvents: [
          {
            id: 4,
            timestamp: new Date('2023-08-28T13:59:25.216Z'),
            quantityCompleted: 3,
            subtaskId: 3,
          },
        ],
      },
      {
        id: 2,
        order: 3,
        quantity: 7,
        status: TaskStatus.Completed,
        product: {
          id: 30,
          name: 'Product 29',
        },
        subtaskEvents: [
          {
            id: 5,
            timestamp: new Date('2023-08-28T14:00:20.146Z'),
            quantityCompleted: 5,
            subtaskId: 2,
          },
          {
            id: 6,
            timestamp: new Date('2023-08-28T14:00:28.541Z'),
            quantityCompleted: 2,
            subtaskId: 2,
          },
        ],
      },
      {
        id: 1,
        order: 4,
        quantity: 8,
        status: TaskStatus.Completed,
        product: {
          id: 1,
          name: 'Product 3',
        },
        subtaskEvents: [
          {
            id: 7,
            timestamp: new Date('2023-08-28T14:00:40.072Z'),
            quantityCompleted: 8,
            subtaskId: 1,
          },
        ],
      },
    ],
    percentageCompleted: 100,
  },
  {
    id: 2,
    createdAt: new Date('2023-08-28T13:48:51.195Z'),
    updatedAt: new Date('2023-08-28T14:00:52.358Z'),
    notes: 'Task 2 notes',
    status: TaskStatus.Completed,
    user: {
      id: 5,
      name: 'Ana',
      lastName: 'Alvarez',
    },
    subtasks: [
      {
        id: 25,
        order: 0,
        quantity: 7,
        status: TaskStatus.Completed,
        product: {
          id: 38,
          name: 'Product 39',
        },
        subtaskEvents: [
          {
            id: 8,
            timestamp: new Date('2023-08-28T14:00:41.539Z'),
            quantityCompleted: 7,
            subtaskId: 25,
          },
        ],
      },
      {
        id: 21,
        order: 1,
        quantity: 3,
        status: TaskStatus.Completed,
        product: {
          id: 46,
          name: 'Product 43',
        },
        subtaskEvents: [
          {
            id: 9,
            timestamp: new Date('2023-08-28T14:00:43.382Z'),
            quantityCompleted: 3,
            subtaskId: 21,
          },
        ],
      },
      {
        id: 17,
        order: 2,
        quantity: 3,
        status: TaskStatus.Completed,
        product: {
          id: 24,
          name: 'Product 19',
        },
        subtaskEvents: [
          {
            id: 10,
            timestamp: new Date('2023-08-28T14:00:44.719Z'),
            quantityCompleted: 3,
            subtaskId: 17,
          },
        ],
      },
      {
        id: 13,
        order: 3,
        quantity: 9,
        status: TaskStatus.Completed,
        product: {
          id: 48,
          name: 'Product 45',
        },
        subtaskEvents: [
          {
            id: 11,
            timestamp: new Date('2023-08-28T14:00:46.249Z'),
            quantityCompleted: 9,
            subtaskId: 13,
          },
        ],
      },
      {
        id: 7,
        order: 4,
        quantity: 9,
        status: TaskStatus.Completed,
        product: {
          id: 7,
          name: 'Product 5',
        },
        subtaskEvents: [
          {
            id: 12,
            timestamp: new Date('2023-08-28T14:00:47.597Z'),
            quantityCompleted: 9,
            subtaskId: 7,
          },
        ],
      },
    ],
    percentageCompleted: 100,
  },
]
