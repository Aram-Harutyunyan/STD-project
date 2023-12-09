import { useState } from 'react'
import isValidEmail from '../../helpers/isValidEmail'
import { Link } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

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
      console.log('Logging in...')
      setErrors({
        email: '',
        password: '',
      })
    } else {
      setErrors(newErrors)
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
