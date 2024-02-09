import { createBrowserRouter } from "react-router-dom";
import Test from '@/pages/test/test.tsx'
import ErrorPage from "../components/Error/Error";
import Login from "@/components/Login/Login";
import Layout from "@/components/Layout/Layout";
import Home from "@/components/Home/Home";
import Signin from "@/components/Signin/Signin";
import Notices from "@/components/Notices/Notices";
import Player from "@/components/Player/Player";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {path: "/login", element: <Login />},
      {path: "/signin", element: <Signin />},
      {path: "/notices", element: <Notices />},
      {path: "/player", element: <Player />},
      {path: "/test", element: <Test />}
    ]
  }
]);

export default router;