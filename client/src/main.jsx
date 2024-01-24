import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import Swal from 'sweetalert2'

import store from './store/index.js'
import { Provider } from 'react-redux'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Layout from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import BidProductPage from './pages/BidProductPage.jsx'
let authHome = () => {
  let access_token = localStorage.access_token
  if (!access_token) {
    throw redirect('/login')
  }
  return null
}

let authLogin = () => {
  let access_token = localStorage.access_token
  if (access_token) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Already logged in",
    })
    throw redirect('/')
  }
  return null
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: authLogin
  },
  {
    path: "/register",
    element: <Register />,
    loader: authLogin
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: authHome,
      },
      {
        path: "/bid/:productId",
        element: <BidProductPage />,
        loader: authHome,
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
