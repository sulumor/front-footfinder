import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages";
import ErrorPage from "@/pages/Error/Error";
import { HomeScout, Search } from "@/pages/Scout";
import { HomePlayer, Match }  from "@/pages/Player";
import { Signup, Login } from "@/pages/Auth";
import { GuestLayout, PlayerLayout, ScoutLayout } from "@/components/Layout";
import { Profil, Notices } from "@/pages/Common";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/notices", element: <Notices /> },

    ],
  },
  {
    path: "/player",
    element: <PlayerLayout />,
    children: [
      { index: true, element: <HomePlayer /> },
      { path: "/player/me", element: <Profil /> },
      { path: "/player/match", element: <Match /> },
    ],
  },
  {
    path: "/scout",
    element: <ScoutLayout />,
    children: [
      { index: true, element: <HomeScout /> },
      { path: "/scout/me", element: <Profil /> },
      { path: "/scout/search", element: <Search/> },
    ],
  },
]);
