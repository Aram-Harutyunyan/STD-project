import { useEffect } from 'react'
import { fetchPosts } from '../../redux/slices/postsSlice'
// import { addPost, editPost, deletePost } from './path-to-postsSlice'
import { useAppSelector, useAppDispatch } from '../../hooks'
import Pagination from '../Pagination'
import Post from './Post'
import { mockData } from './data'

const PostGrid = () => {
  const dispatch = useAppDispatch()
  const { results, next, previous, count } = useAppSelector(
    (state) => state.posts,
  )
  console.log('Results', results)
  useEffect(() => {
    dispatch(fetchPosts('/post/crud/'))
  }, [dispatch])

  const renderPosts = () => {
    return results.map((post) => (
      <div key={post.id} className="w-1/2 p-4">
        <h3 className="text-lg font-bold">{post.title}</h3>
        {/* Additional post details rendering */}
      </div>
    ))
  }

  return (
    <div className="w-full h-full">
      <h1>Post Grid</h1>
      <div className="grid grid-cols-2 gap-4">
        {mockData.results.map((post) => (
          <div key={post.id}>
            <Post {...post} />
          </div>
        ))}
      </div>
      <Pagination count={count} offset={results.length} />
    </div>
  )
}

export default PostGrid
