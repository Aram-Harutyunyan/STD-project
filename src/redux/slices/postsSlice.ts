import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Post {
  id: number
  title: string
}

interface PostsState {
  list: Post[]
}

const initialState: PostsState = {
  list: [],
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state, action: PayloadAction<Post[]>) => {
      state.list = action.payload
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.list.push(action.payload)
    },
    editPost: (
      state,
      action: PayloadAction<{ id: number; updatedPost: Post }>,
    ) => {
      const { id, updatedPost } = action.payload
      const index = state.list.findIndex((post) => post.id === id)
      if (index !== -1) {
        state.list[index] = updatedPost
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      const postId = action.payload
      state.list = state.list.filter((post) => post.id !== postId)
    },
  },
})

export const { addPost, editPost, deletePost } = postsSlice.actions
export default postsSlice
