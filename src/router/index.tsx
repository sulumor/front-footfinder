import { createBrowserRouter } from "react-router-dom";
import Test from '@/pages/test/test.tsx'
import ErrorPage from "../components/Error/Error";
import Login from "@/components/Login/Login";
import Layout from "@/components/Layout/Layout";
import Home from "@/components/Home/Home";
import Signin from "@/components/Signin/Signin";
import Notices from "@/components/Notices/Notices";
import Player from "@/components/Player/Player";
import Match from "@/components/Match/Match";
import Stats from "@/components/Stats/Stats";
import Scout from "@/components/Scout/Scout";
import PlayerProfil from "@/components/PlayerProfil/PlayerProfil";


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
      {path: "/player/match", element: <Match />},
      {path: "/player/match/1", element: <Stats />},
      {path: "/scout", element: <Scout />},
      {path: "/player/me", element: <PlayerProfil />},
      {path: "/test", element: <Test />}
    ]
  }
]);

export default router;