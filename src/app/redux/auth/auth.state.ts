export interface AuthState {
  loading: boolean
  loaded: boolean
  error?: string
}

export const initialAuthState: AuthState = {
  loading: false,
  loaded: false,
}
