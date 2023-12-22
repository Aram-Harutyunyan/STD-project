import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import { setAuthMessage } from '../../redux/slices/authSlice'
import api from '../../utils/api'
import { useAppDispatch, useAppSelector } from '../../hooks'
import TextArea from '../TextArea'
import AddImage from '../../assets/images/add-image.png'
import { fetchCategories } from '../../redux/slices/categorySlice'
import { fetchPost } from '../../redux/slices/postsSlice'
import Select from '../Select'
import imageUrlToFile from '../../helpers/imageUrlToFile'
import extractCategoryNumber from '../../helpers/extractCategoryNumber'

interface EditAddFormState {
  title: string
  description: string
  category: string
  image: File
  imageUrl: string
}

const AddEditPost = () => {
  const dispatch = useAppDispatch()
  const categoriesList = useAppSelector((state) => state.categories)
  const editablePost = useAppSelector((state) => state.posts.editable)
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setData] = useState<EditAddFormState>({
    title: '',
    description: '',
    category: '',
    image: null as unknown as File,
    imageUrl: '',
  })

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = {} as {
      title: string
      description: string
      category: string
      image: string
    }
    if (!data.title) {
      newErrors.title = 'title is required'
    }

    if (!data.description) {
      newErrors.description = 'description is required'
    }

    if (!data.category) {
      newErrors.category = 'category is required'
    }

    if (!data.image) {
      newErrors.image = 'No Avatar is selected'
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('category', extractCategoryNumber(data.category))
        formData.append('image', data.image, data.image.name)
        let postResponse
        if (id) {
          postResponse = await api.put(
            `/post/crud/${id}/`,
            formData,
            'multipart/form-data',
          )
        } else {
          postResponse = await api.post(
            '/post/crud/',
            formData,
            true,
            'multipart/form-data',
          )
        }

        dispatch(
          setAuthMessage({
            message: postResponse.message,
          }),
        )
        navigate('/posts')
      } catch (error) {
        console.log('Add-Edit issue : ', error)
      }
    } else {
      setErrors(newErrors)
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files || files.length === 0) return
    const selectedFile = files[0]

    setData({
      ...data,
      image: selectedFile,
      imageUrl: URL.createObjectURL(selectedFile),
    })
  }
  useEffect(() => {
    dispatch(fetchCategories('/category/'))
    if (id) {
      dispatch(fetchPost(`/post/crud/${id}/`))
    }
  }, [id])

  useEffect(() => {
    if (editablePost) {
      ;(async () => {
        const image = await imageUrlToFile(editablePost.image, 'Post-image')
        if (image) {
          setData({
            ...data,
            imageUrl: editablePost.image,
            image,
            title: editablePost.title,
            category: editablePost.category.name,
            description: editablePost?.description,
          })
        }
      })()
    }
  }, [editablePost])

  return (
    <div className="flex rounded-2xl items-center justify-center pt-5 pr-10 pb-10 pl-10 bg-bg--Wrapper">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="flex pb-4 justify-center text-2xl text-ct--Blue">
          {id ? 'Edit post' : 'Add post'}
        </h1>
        <div className="flex flex-col justify-center pb-5">
          <label htmlFor="file">
            <img
              src={data.imageUrl ? data.imageUrl : AddImage}
              alt={data.image ? 'Selected Image' : 'Default Image'}
              className="h-[120px] w-[120px] object-cover"
            />
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </label>
          {errors.image && (
            <p className="text-red-500 text-xs italic">{errors.image}</p>
          )}
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            id="title"
            type="text"
            placeholder="Title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            errors={errors.title}
          />
          <TextArea
            id="text-area"
            placeholder="Put your description here..."
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            errors={errors.description}
          />
          <Select
            id="category"
            placeholder="Select Category"
            options={categoriesList}
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            errors={errors.category}
          />
          <div className="pb-2 pt-2 flex items-center justify-center">
            <Button type="submit" name={id ? 'Edit' : 'Create'} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEditPost
