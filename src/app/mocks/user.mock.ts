import { UserResponse, UserRole } from '@shared/models/user-response.model'

export const USER_RESPONSE_MOCK: UserResponse[] = [
  {
    id: 1,
    name: 'root',
    lastName: null,
    username: 'root',
    role: UserRole.ADMIN,
    createdAt: new Date('2023-08-28T13:48:50.950Z'),
    active: true,
    updatedAt: new Date('2023-08-28T13:48:50.950Z'),
  },
  {
    id: 3,
    name: 'Sofia',
    lastName: 'Perez',
    username: 'sofiaperez39',
    role: UserRole.USER,
    createdAt: new Date('2023-08-28T13:48:50.977Z'),
    active: true,
    updatedAt: new Date('2023-08-28T13:48:50.977Z'),
  },
]
