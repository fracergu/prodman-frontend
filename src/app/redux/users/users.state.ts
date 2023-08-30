import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { UserResponse } from '@shared/models/user-response.model'

export interface UsersState extends EntityState<UserResponse> {
  nextPage?: number | null
  prevPage?: number | null
  total?: number
  loading: boolean
  loaded: boolean
  error?: string
}

export const usersAdapter: EntityAdapter<UserResponse> =
  createEntityAdapter<UserResponse>({
    selectId: (user: UserResponse) => user.id,
  })

export const initialUserState: UsersState = usersAdapter.getInitialState({
  loading: false,
  loaded: false,
})
