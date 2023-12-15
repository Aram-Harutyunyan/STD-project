import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/api'

interface Author {
  id: number
  full_name: string
}

interface Category {
  id: number
  slug: string
  name: string
}

interface Post {
  id: number
  title: string
  description: string
  image: string
  category: Category
  author: Author
}

interface PostsState {
  results: Post[]
  count: number
  next: string | null
  previous: string | null
}
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (url: string) => {
    const response = await api.get(url)
    console.log('RESPONSE', response)
    // Assuming that the API response has the same structure as your PostsState
    return response as PostsState
  },
)

const initialState: PostsState = {
  results: [],
  count: 0,
  next: null,
  previous: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state, action: PayloadAction<PostsState>) => {
      // Update state with the fetched posts data
      state.results = action.payload.results
      state.count = action.payload.count
      state.next = action.payload.next
      state.previous = action.payload.previous
      console.log('STATE', state)
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.results.push(action.payload)
    },
    editPost: (
      state,
      action: PayloadAction<{ id: number; updatedPost: Post }>,
    ) => {
      const { id, updatedPost } = action.payload
      const index = state.results.findIndex((post) => post.id === id)
      if (index !== -1) {
        state.results[index] = updatedPost
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      const postId = action.payload
      state.results = state.results.filter((post) => post.id !== postId)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      console.log('dispatched', action)
      // Dispatch the getPosts action to update the Redux state
      postsSlice.caseReducers.getPosts(state, action)
    })
  },
})

export const { addPost, editPost, deletePost } = postsSlice.actions
export default postsSlice
