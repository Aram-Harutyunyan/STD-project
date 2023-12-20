import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import postsSlice from './slices/postsSlice'
import categoriesSlice from './slices/categorySlice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    posts: postsSlice.reducer,
    categories: categoriesSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
