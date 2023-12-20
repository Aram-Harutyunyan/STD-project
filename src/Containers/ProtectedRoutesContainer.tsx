import { ReactNode } from 'react'
import Navbar from '../components/Navbar'

const ProtectedRoutesContainer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto w-4/5 max-w-screen-xl flex justify-center items-center bg-#f6f6f6">
        {children}
      </div>
    </>
  )
}

export default ProtectedRoutesContainer
