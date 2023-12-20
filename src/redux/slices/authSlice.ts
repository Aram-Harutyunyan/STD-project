import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PayloadUser {
  id: number
  email: string
  first_name: string
  last_name: string
  image: string
  is_active: boolean
}

interface User {
  id: number
  email: string
  name: string
  surname: string
  image: string
  isActive: boolean
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  message: string | null
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  message: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{
        user: PayloadUser
      }>,
    ) => {
      const { email, id, image, first_name, last_name, is_active } =
        action.payload.user
      state.user = {
        image,
        name: first_name,
        surname: last_name,
        id,
        email,
        isActive: is_active,
      }
    },
    setAuthData: (
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
        user: PayloadUser
      }>,
    ) => {
      const { email, id, image, first_name, last_name, is_active } =
        action.payload.user
      state.user = {
        image,
        name: first_name,
        surname: last_name,
        id,
        email,
        isActive: is_active,
      }
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    clearAuthData: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
    },
    setAuthMessage: (
      state,
      action: PayloadAction<{
        message: string
      }>,
    ) => {
      state.message = action.payload.message
    },
  },
})

export const { setUserData, setAuthData, clearAuthData, setAuthMessage } =
  authSlice.actions
export default authSlice
