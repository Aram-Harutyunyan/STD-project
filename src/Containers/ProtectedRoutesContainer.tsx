import { ReactNode } from 'react'
import Navbar from '../components/Navbar'

const ProtectedRoutesContainer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="w-3/5 flex justify-center items-center h-4/5 bg-#f6f6f6">
        {children}
      </div>
    </>
  )
}

export default ProtectedRoutesContainer
