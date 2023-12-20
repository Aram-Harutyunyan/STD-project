import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/api'

interface Category {
  id: number
  slug: string
  name: string
}
const initialState = [] as Category[]

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (url: string) => {
    const response = await api.get(url)
    return response as Category[]
  },
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories: (state, action: PayloadAction<Category[]>) => {
      state.splice(0, state.length, ...action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      categoriesSlice.caseReducers.getCategories(state, action)
    })
  },
})

export const { getCategories } = categoriesSlice.actions
export default categoriesSlice
