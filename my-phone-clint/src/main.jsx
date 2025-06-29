import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Components/Main.jsx';
import Phones from './Components/Phones.jsx';
import Phone from './Components/Phone.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/phones",
        element: <Phones />,
        loader:()=>fetch('http://localhost:5000/phones')
      },
      {
        path:'/phone/:id',
        element:<Phone></Phone>,
        loader:({params}) => fetch(`http://localhost:5000/phones/${params.id}`)
      }
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
