import { useState } from 'react'
import isValidEmail from '../../helpers/isValidEmail'
import { Link } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import AvatarIcon from '../../assets/Avatar.svg?react'

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = {} as {
      name: string
      surname: string
      email: string
      password: string
      confirmPassword: string
    }
    if (!formData.name) {
      newErrors.name = 'Name is required'
    }

    if (!formData.surname) {
      newErrors.surname = 'Surname is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Does not match with password !'
    }

    if (Object.keys(newErrors).length === 0) {
      console.log('Registering...')
      setErrors({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } else {
      setErrors(newErrors)
    }
  }
  return (
    <div className="flex rounded-2xl items-center justify-center pt-5 pr-10 pb-10 pl-10 bg-bg--Wrapper">
      <div className="w-full">
        <h1 className="flex pb-4 justify-center text-2xl text-ct--Blue">
          Sign Up
        </h1>
        <div className="flex justify-center pb-3">
          <AvatarIcon />
        </div>
        <form onSubmit={handleRegistration}>
          <div className="flex pb-4 gap-4">
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              errors={errors.name}
            />
            <Input
              id="surname"
              type="text"
              placeholder="Surname"
              value={formData.surname}
              onChange={(e) =>
                setFormData({ ...formData, surname: e.target.value })
              }
              errors={errors.surname}
            />
          </div>
          <div className="flex justify-start pb-3">
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
          </div>
          <div className="flex pb-4 gap-4">
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
            <Input
              id="repeat-password"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
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
