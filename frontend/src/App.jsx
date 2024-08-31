
import './App.css'
import {BrowserRouter, RouterProvider,createBrowserRouter} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import Layout from './components/Layout'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import CreatePost from './pages/CreatePostPage'
import UserContextProvider from '../context/userContext'
import SinglePost from './pages/PostPage'
import EditPost from './pages/EditPage'
import { useContext } from 'react'
import { userContext } from '../context/userContext'

function App() {
  
  const router = createBrowserRouter([
    {
      path : "/",
      element : <Layout/>,
      children : [
        {
          path : "",
          element : <IndexPage/>
        },
        {
          path : "/login",
          element : <Login/>
        },
        {
          path : "/register",
          element : <Register/>
        },
        {
          path : "/create",
          element : <CreatePost/>
        },
        {
          path : "edit/:id",
          element : <EditPost/>
        },
        {
          path : "/posts/:id",
          element : <SinglePost/>
        },
        
      ]
    }
  ])

  return (
    <UserContextProvider>
    <RouterProvider router={router}/>
    </UserContextProvider>
  )
}

export default App
