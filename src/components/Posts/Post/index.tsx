import TitleValue from './TitleValue'
import Icons from './Icons'
import img from '../../../assets/images/img1.jpg'

interface Category {
  id: number
  slug: string
  name: string
}
interface Author {
  id: number
  full_name: string
}
interface Props {
  id: number
  title: string
  description: string
  image: string
  category: Category
  author: Author
}

const Post = (post: Props) => {
  return (
    <div
      key={post.id}
      className="flex gap-3 p-4 rounded-lg overflow-hidden bg-white shadow-md"
    >
      <img src={post.image} className="w-2/5 rounded-lg" />
      <div className="flex flex-col flex-1 justify-start gap-2">
        <div className="flex justify-between items-center">
          <TitleValue title="Name" value={post.title} />
          <Icons id={post.id} />
        </div>
        <TitleValue title="Description" value={post.description} />
        <TitleValue title="Category" value={post.category.name} />
      </div>

      {/* Additional post details rendering */}
    </div>
  )
}

export default Post
