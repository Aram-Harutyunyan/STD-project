import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Registration from './components/Registration'
import NotFound from './components/NotFound'
import Posts from './components/Posts'
import PostCreate from './components/Posts/postsCreate'
import PostEdit from './components/Posts/postsEdit'
import ProtectedRoute from './components/protectedRoute'

import './App.css'

const App = () => {
  const user = ''
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/posts">
          <Route
            index
            element={
              <ProtectedRoute user={user}>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="create"
            element={
              <ProtectedRoute user={user}>
                <PostCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <ProtectedRoute user={user}>
                <PostEdit />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
