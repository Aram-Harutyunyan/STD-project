import { useEffect } from 'react'
import { fetchPosts } from '../../redux/slices/postsSlice'
// import { addPost, editPost, deletePost } from './path-to-postsSlice'
import { useAppSelector, useAppDispatch } from '../../hooks'
import Pagination from '../Pagination'
import Post from './Post'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

const ITEMS_PER_PAGE = 4

const PostGrid = () => {
  const navigate = useNavigate()
  const { results, count } = useAppSelector((state) => state.posts)

  const handleClick = () => {
    navigate('/posts/create/')
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="flex w-full justify-between items-center">
        <h1>All Posts</h1>
        <Button type="button" name={'+ Add Post'} handleClick={handleClick} />
      </div>
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-4">
        {results.map((post) => (
          <div key={post.id}>
            <Post {...post} />
          </div>
        ))}
      </div>
      <Pagination count={count} itemsPerPage={ITEMS_PER_PAGE} />
    </div>
  )
}

export default PostGrid
