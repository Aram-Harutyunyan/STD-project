import { ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { setUserData } from '../../redux/slices/authSlice'
import api from '../../utils/api'

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const isDataAvailable =
      sessionStorage.getItem('authToken') || localStorage.getItem('authToken')
    const checkUserAuthentication = async () => {
      try {
        if (isDataAvailable) {
          const authenticatedUser = await api.get('/user/me/')
          dispatch(setUserData({ user: authenticatedUser }))
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.error('Error checking user authentication:', error)
      }
    }

    checkUserAuthentication()
  }, [])

  return children
}

export default ProtectedRoute
