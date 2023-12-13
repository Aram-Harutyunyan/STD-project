import { useState } from 'react'
import isValidEmail from '../../helpers/isValidEmail'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import api from '../../utils/api'
import { setAuthData } from '../../redux/slices/authSlice'
import { useAppDispatch } from '../../hooks'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newErrors = {} as {
        email: string
        password: string
      }

      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }

      if (!formData.password) {
        newErrors.password = 'Password is required'
      }

      if (Object.keys(newErrors).length === 0) {
        setErrors({
          email: '',
          password: '',
        })
        const loginResponse = await api.post(
          '/user/sign-in/',
          { email: formData.email, password: formData.password },
          false,
        )

        if (formData.rememberMe) {
          localStorage.setItem('authToken', loginResponse.token.access)
          localStorage.setItem('refreshToken', loginResponse.token.refresh)
        } else {
          sessionStorage.setItem('authToken', loginResponse.token.access)
          sessionStorage.setItem('refreshToken', loginResponse.token.refresh)
        }
        dispatch(
          setAuthData({
            accessToken: loginResponse.token.access,
            refreshToken: loginResponse.token.refresh,
            user: loginResponse.user,
          }),
        )
        navigate('/posts')
      } else {
        setErrors(newErrors)
      }
    } catch (error) {
      console.log('Error during login:', error)
    }
  }
  const handleRememberMeChange = () => {
    setFormData({ ...formData, rememberMe: !formData.rememberMe })
  }
  return (
    <div className="flex rounded-2xl items-center justify-center pt-5 pr-10 pb-10 pl-10 bg-bg--Wrapper">
      <div className="w-full max-w-md">
        <h1 className="flex pb-4 justify-center text-2xl text-ct--Blue">
          Sign In
        </h1>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col pb-4 gap-4">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              errors={errors.email}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              errors={errors.password}
            />
          </div>
          <div className="flex items-center">
            <input
              className="mr-2 leading-tight"
              id="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleRememberMeChange}
            />
            <label className="text-sm text-gray-700" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <div className="pb-2 pt-2 flex items-center justify-center">
            <Button type="submit" name="Sign In" />
          </div>
          <div className="flex justify-center text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/registration"
              className="text-blue-500 hover:underline pl-2"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
