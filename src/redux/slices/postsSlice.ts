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
  editable: Post | null
}
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (url: string) => {
    const response = await api.get(url)
    return response as PostsState
  },
)
export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (url: string) => {
    const response = await api.get(url)
    return response as Post
  },
)
const initialState: PostsState = {
  results: [],
  count: 0,
  next: null,
  previous: null,
  editable: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state, action: PayloadAction<PostsState>) => {
      state.results = action.payload.results
      state.count = action.payload.count
      state.next = action.payload.next
      state.previous = action.payload.previous
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.results.push(action.payload)
    },
    editPost: (state, action: PayloadAction<Post>) => {
      const index = state.results.findIndex(
        (post) => post.id === action.payload.id,
      )
      if (index !== -1) {
        state.results[index] = action.payload
        state.editable = action.payload
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      const postId = action.payload
      state.results = state.results.filter((post) => post.id !== postId)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      postsSlice.caseReducers.getPosts(state, action)
    }),
      builder.addCase(fetchPost.fulfilled, (state, action) => {
        postsSlice.caseReducers.editPost(state, action)
      })
  },
})

export const { addPost, editPost, deletePost, getPosts } = postsSlice.actions
export default postsSlice
