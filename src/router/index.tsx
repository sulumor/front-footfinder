import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages";
import ErrorPage from "@/pages/Error/Error";
import Match from "@/pages/Player/Match";
import ScoutHome from "@/pages/Scout/ScoutHome";
import PlayerHome from "@/pages/Player/PlayerHome";
import PlayerProfil from "@/pages/Player/PlayerProfil";
import App from "@/App";
import PlayerForScout from "@/components/PlayerForScout/PlayerForScout";
import LoginPage from "@/pages/Login/LoginPage";
import SigninPage from "@/pages/Signin/SigninPage";
import SigninPlayer from "@/pages/Signin/SigninPlayer";
import SigninScout from "@/pages/Signin/SigninScout";
import NoticesPage from "@/pages/Notices/NoticesPage";
import SearchPage from "@/pages/Scout/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signin", element: <SigninPage /> },
      { path: "/notices", element: <NoticesPage /> },
      { path: "/player", element: <PlayerHome /> },
      { path: "/player/:id", element: <PlayerForScout />},
      { path: "/player/match", element: <Match /> },
      { path: "/player/create", element: <SigninPlayer /> },
      { path: "/scout/create", element: <SigninScout />},
      { path: "/scout", element: <ScoutHome /> },
      { path: "/player/me", element: <PlayerProfil /> },
      { path: "/scout/search", element : <SearchPage/> },
    ],
  },
]);