export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type UserState = {
  loadingUsers: boolean
  creatingUser: boolean
  creatingError: string | null
  updatingUser: boolean
  updatingError: string | null
  deletingUser: boolean
  deletingError: string | null
  users: User[]
  total: number
  selectedUser: User | null
}

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
}

export type CreateUserData = Omit<User, 'id'>
export type UpdateUserData = Partial<CreateUserData> & {
  id: string
}

export type GetUsersResponse = {
  users: User[]
  total: number
}
