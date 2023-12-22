import EditIcon from '../../../assets/edit.svg?react'
import DeleteIcon from '../../../assets/delete.svg?react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../hooks'
import Modal from '../../Modal'
import { useState } from 'react'
import { postDelete } from '../../../redux/slices/postsSlice'

const Icons = ({ id }: { id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleEdit = () => {
    navigate(`/posts/edit/${id}/`)
  }
  const handleDelete = () => {
    dispatch(postDelete(`/post/crud/${id}/`))
    setIsModalOpen(false)
  }
  return (
    <div className="flex gap-2 justify-between">
      <EditIcon className="cursor-pointer" onClick={handleEdit} />
      <DeleteIcon
        className="cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDelete}
        content={<p>Are you sure you want to delete this item?</p>}
      />
    </div>
  )
}

export default Icons
