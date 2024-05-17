import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages";
import ErrorPage from "@/pages/Error/Error";
import Match from "@/pages/Player/Match";
import ScoutHome from "@/pages/Scout/ScoutHome";
import PlayerHome from "@/pages/Player/PlayerHome";
import PlayerProfil from "@/pages/Player/PlayerProfil";
import PlayerForScout from "@/components/PlayerForScout/PlayerForScout";
import { Signup, Login } from "@/pages/Auth";
import SigninPlayer from "@/pages/Signin/SigninPlayer";
import SigninScout from "@/pages/Signin/SigninScout";
import NoticesPage from "@/pages/Notices/NoticesPage";
import SearchPage from "@/pages/Scout/SearchPage";
import { GuestLayout, PlayerLayout, ScoutLayout } from "@/components/Layout";

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
      { index: true, element: <PlayerHome /> },
      { path: "/player/:id", element: <PlayerForScout /> },
      { path: "/player/match", element: <Match /> },
      { path: "/player/create", element: <SigninPlayer /> },
      { path: "/player/me", element: <PlayerProfil /> },
    ],
  },
  {
    path: "/scout",
    element: <ScoutLayout />,
    children: [
      { index: true, element: <ScoutHome /> },
      { path: "/scout/create", element: <SigninScout /> },
      { path: "/scout/search", element: <SearchPage /> },
    ],
  },
]);
