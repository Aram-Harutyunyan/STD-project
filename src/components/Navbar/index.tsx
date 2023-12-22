import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { clearAuthData } from '../../redux/slices/authSlice'
import { clearTokens } from '../../helpers/clearTokens'

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearAuthData())
    clearTokens()
    navigate('/login')
  }

  return (
    <nav className="bg-white p-4 w-full fixed top-0 z-10">
      <div className="flex justify-between items-center">
        <div
          className="text-ct--Blue cursor-pointer"
          onClick={() => navigate('/posts')}
        >
          <span className="font-semibold">Posts</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={user?.image}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-black">{user?.name + ' ' + user?.surname}</span>
          <button onClick={handleLogout} className="text-ct--Blue">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
