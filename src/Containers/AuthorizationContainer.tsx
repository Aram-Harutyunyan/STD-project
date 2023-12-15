import { ReactNode } from 'react'

const AuthorizationContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen flex justify-center items-center h-screen bg-ct--Blue">
      {children}
    </div>
  )
}

export default AuthorizationContainer
