import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLAyout from './Layout/MainLAyout.jsx';
import Home from './Components/Home.jsx';
import AddCoffee from './Components/AddCoffee.jsx';
import UpdateCoffee from './Components/UpdateCoffee.jsx';
import CoffeeDetails from './Components/CoffeeDetails.jsx';
import Loading from './Components/Loading.jsx';
import SingIn from './Components/SingIn.jsx';
import SIgnUp from './Components/SIgnUp.jsx';
import AuthProvider from './Components/Context/AuthProvider.jsx';
import Users from './Components/Users.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// import { getTodos, postTodo } from '../my-api'
import User2 from './Components/User2.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLAyout,
    children: [
      {
        index: true,
        loader: () => fetch('http://localhost:3000/coffees'),
        hydrateFallbackElement: <Loading></Loading>,
        Component: Home
      },
      {
        path: 'addCoffee',
        Component: AddCoffee
      },
      {
        path: '/coffee/:id',
        Component: CoffeeDetails,
        loader: ({ params }) => fetch(`http://localhost:3000/coffees/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: 'updateCoffee/:id',
        Component: UpdateCoffee,
        loader: ({ params }) => fetch(`http://localhost:3000/coffees/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: 'signIn',
        Component: SingIn
      },
      {
        path: 'signUp',
        Component: SIgnUp
      },
      {
        path: '/users',
        Component: Users,
        loader: () => fetch('http://localhost:3000/users'),
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: '/users2',
        Component: User2,
      }
    ]
  },
]);
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
