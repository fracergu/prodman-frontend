export const UserRolesObj = [
  { label: 'Admininstador', value: 'admin' },
  { label: 'Usuario', value: 'user' },
]

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserResponse {
  id: number
  username: string
  name: string
  lastName: null | string
  role: UserRole
  active: boolean
  password?: string
  createdAt?: Date
  updatedAt?: Date
}
