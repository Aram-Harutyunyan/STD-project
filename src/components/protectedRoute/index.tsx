import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({
  user,
  children,
}: {
  user: string
  children: ReactElement
}) => {
  if (!user) {
    return <Navigate to={'/login'} replace />
  }

  return children
}

export default ProtectedRoute
