import { useState } from 'react'
import isValidEmail from '../../helpers/isValidEmail'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import AvatarIcon from '../../assets/Avatar.svg?react'
import { setAuthMessage } from '../../redux/slices/authSlice'
import api from '../../utils/api'
import { useAppDispatch } from '../../hooks'

interface SignUpFormState {
  name: string
  surname: string
  email: string
  password: string
  confirmPassword: string
  image: File
}

const RegistrationForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState<SignUpFormState>({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null as unknown as File,
  })

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  })

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = {} as {
      name: string
      surname: string
      email: string
      password: string
      confirmPassword: string
      image: string
    }
    if (!data.name) {
      newErrors.name = 'Name is required'
    }

    if (!data.surname) {
      newErrors.surname = 'Surname is required'
    }

    if (!data.email) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(data.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!data.password) {
      newErrors.password = 'Password is required'
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required'
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Does not match with password !'
    }
    if (!data.image) {
      newErrors.image = 'No Avatar is selected'
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('first_name', data.name)
        formData.append('last_name', data.surname)
        formData.append('image', data.image)
        const signUpResponse = await api.post(
          '/user/sign-up/',
          formData,
          false,
          'multipart/form-data',
        )

        dispatch(
          setAuthMessage({
            message: signUpResponse.message,
          }),
        )
        navigate('/login')
      } catch (error) {
        console.log('Sign-up issue : ', error)
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
    })
  }
  return (
    <div className="flex rounded-2xl items-center justify-center pt-5 pr-10 pb-10 pl-10 bg-bg--Wrapper">
      <div className="w-full">
        <h1 className="flex pb-4 justify-center text-2xl text-ct--Blue">
          Sign Up
        </h1>
        <div className="flex flex-col items-center justify-center pb-3">
          <label htmlFor="file">
            {data.image ? (
              <img
                src={URL.createObjectURL(data.image)}
                alt="Selected Avatar"
                className="rounded-full h-[120px] w-[120px] object-cover"
              />
            ) : (
              <AvatarIcon />
            )}
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
        <form onSubmit={handleRegistration}>
          <div className="flex pb-4 gap-4">
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              errors={errors.name}
            />
            <Input
              id="surname"
              type="text"
              placeholder="Surname"
              value={data.surname}
              onChange={(e) => setData({ ...data, surname: e.target.value })}
              errors={errors.surname}
            />
          </div>
          <div className="flex justify-start pb-3">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              errors={errors.email}
            />
          </div>
          <div className="flex pb-4 gap-4">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              errors={errors.password}
            />
            <Input
              id="repeat-password"
              type="password"
              placeholder="Confirm password"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              errors={errors.confirmPassword}
            />
          </div>
          <div className="pb-2 pt-2 flex items-center justify-center">
            <Button type="submit" name="Sign Up" />
          </div>
          <div className="flex justify-center text-sm text-gray-600">
            Don't have an account?
            <Link to="/login" className="text-blue-500 hover:underline pl-2">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
