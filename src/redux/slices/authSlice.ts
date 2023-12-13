import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  email: string
  name: string
  surname: string
  image?: string
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{
        user: User | null
      }>,
    ) => {
      state.user = action.payload.user
    },
    setAuthData: (
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
        user: AuthState['user']
      }>,
    ) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
    },
    clearAuthData: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
    },
  },
})

export const { setUserData, setAuthData, clearAuthData } = authSlice.actions
export default authSlice
