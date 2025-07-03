import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import LogIn from "../Pages/Authentication/Login/LogIn";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import SendPercel from "../Pages/SendPercel/sendPercel";
import DeahBoardLayout from "../Layout/DeahBoardLayout";
import MyParsels from "../Pages/DeshBoard/MyParcels/MyParsels";
import Payment from "../Pages/DeshBoard/Payment/Payment";
import PaymentHistory from "../Pages/DeshBoard/Payment/PaymentHistory";
import TrackParcel from "../Pages/DeshBoard/TrackParcel/TrackParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {index:true,Component:Home},
        {
          path:'coverage',
          Component:Coverage,
          loader:()=>fetch('/warehouses.json')
        },
        {
          path:'sendPercel',
          element:<PrivateRoutes><SendPercel></SendPercel></PrivateRoutes>,
          loader:()=>fetch('/warehouses.json')
        }
    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'login',
        Component:LogIn
      },
      {
        path:'register',
        Component:Register
      }
    ]
  },
  {
    path:'/dashboard',
    element:<PrivateRoutes>
      <DeahBoardLayout></DeahBoardLayout>
      </PrivateRoutes>,
    children:[
      {
        path:'myParcels',
        Component:MyParsels
      },
      {
        path:'payment/:parcelId',
        Component:Payment
      },
      {
        path:'paymentHistory',
        Component:PaymentHistory
      },
      {
        path:'trackingPakage',
        Component:TrackParcel
      }
    ]
  }
]);