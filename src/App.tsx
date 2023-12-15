import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Registration from './components/Registration'
import NotFound from './components/NotFound'
import Posts from './components/Posts'
import PostCreate from './components/Posts/postsCreate'
import PostEdit from './components/Posts/postsEdit'
import ProtectedRoute from './components/protectedRoute'
import AuthorizationContainer from './Containers/AuthorizationContainer'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/login'}
          element={
            <AuthorizationContainer>
              <Login />
            </AuthorizationContainer>
          }
        />
        <Route
          path="/registration"
          element={
            <AuthorizationContainer>
              <Registration />
            </AuthorizationContainer>
          }
        />
        <Route path="/posts">
          <Route
            index
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="create"
            element={
              <ProtectedRoute>
                <PostCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <ProtectedRoute>
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
