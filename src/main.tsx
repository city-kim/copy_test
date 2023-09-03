// import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import App from './pages/App.tsx'
import List from './pages/List.tsx'

import './main.css'
import './reset.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/list',
    element: <List />
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  // </React.StrictMode>
);
