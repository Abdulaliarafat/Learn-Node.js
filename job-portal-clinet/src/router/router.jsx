import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SingnIn/SignIn";
import JobDetails from "../pages/jobsDetails/JobDetails";
import PrivateRoute from "../AuthContext/PrivateRoute";
import JobApplay from "../pages/ApplayJobs/JobApplay";
import MyApplication from "../pages/MyApplication/MyApplication";
import AddJobs from "../pages/AddJobs/AddJobs";
import MyPostedJobs from "../pages/MypostedJobs/MyPostedJobs";
import ViewApplication from "../pages/ViewApplications/ViewApplication";

const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayout,
   children:[
    {index:true,Component:Home},
    {
      path:'/jobDetails/:id',
      loader:({params})=>fetch(`https://job-portal-server-seven-omega.vercel.app/jobs/${params.id}`),
      Component:JobDetails
    },
    {
      path:'/jobApplay/:id',
      element:<PrivateRoute><JobApplay></JobApplay></PrivateRoute>,
    },
    {
     path:'/myApplication',
     element:<PrivateRoute><MyApplication></MyApplication></PrivateRoute>
    },
    {
     path:'/addJob',
     element:<PrivateRoute><AddJobs></AddJobs></PrivateRoute>
    },
    {
      path:'/myPostedJobs',
      element:<PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
    },
    {
    path:'/ViewApplications/:job_id',
    element:<PrivateRoute><ViewApplication></ViewApplication></PrivateRoute>,
    loader:({params})=>fetch(`https://job-portal-server-seven-omega.vercel.app/applications/job/${params.job_id}`)
    },
    {
      path:'/register',
      Component:Register
    },
    {
      path:'/signin',
      Component:SignIn
    }
   ]
  },
]);

export default router;