import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages";
import ErrorPage from "@/pages/Error/Error";
import { HomeScout, Search } from "@/pages/Scout";
import { HomePlayer, Match }  from "@/pages/Player";
import { Signup, Login } from "@/pages/Auth";
import SigninPlayer from "@/pages/Signin/SigninPlayer";
import SigninScout from "@/pages/Signin/SigninScout";
import NoticesPage from "@/pages/Notices/NoticesPage";
import { GuestLayout, PlayerLayout, ScoutLayout } from "@/components/Layout";
import { Profil } from "@/pages/Common";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/notices", element: <NoticesPage /> },

    ],
  },
  {
    path: "/player",
    element: <PlayerLayout />,
    children: [
      { index: true, element: <HomePlayer /> },
      { path: "/player/me", element: <Profil /> },
      { path: "/player/match", element: <Match /> },
      // { path: "/player/create", element: <SigninPlayer /> },
    ],
  },
  {
    path: "/scout",
    element: <ScoutLayout />,
    children: [
      { index: true, element: <HomeScout /> },
      { path: "/scout/me", element: <Profil /> },
      { path: "/scout/search", element: <Search/> },
      // { path: "/scout/create", element: <SigninScout /> },
    ],
  },
]);
