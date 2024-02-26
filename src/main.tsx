import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import ErrorPage from "@/components/Error/Error";
import Player from "@/pages/Player/Player";
import Match from "@/components/Match/Match";
import Stats from "@/components/Stats/Stats";
import ScoutHome from "./pages/Scout/ScoutHome";
import PlayerProfil from "@/components/PlayerProfil/PlayerProfil";
import App from "./components/App/App";
import PlayerForScout from "./components/PlayerForScout/PlayerForScout";
import LoginPage from "./pages/Login/LoginPage";
import SigninPage from "./pages/Signin/SigninPage";
import SigninPlayer from "./pages/Signin/SigninPlayer";
import SigninScout from "./pages/Signin/SigninScout";
import NoticesPage from "./pages/Notices/NoticesPage";
import SearchPage from "./pages/Scout/SearchPage";

import store from "./components/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signin", element: <SigninPage /> },
      { path: "/notices", element: <NoticesPage /> },
      { path: "/player", element: <Player /> },
      { path: "/player/:id", element: <PlayerForScout />},
      { path: "/player/match", element: <Match /> },
      { path: "/player/match/:matchId", element: <Stats /> },
      { path: "/player/create", element: <SigninPlayer /> },
      { path: "/scout/create", element: <SigninScout />},
      { path: "/scout", element: <ScoutHome /> },
      { path: "/player/me", element: <PlayerProfil /> },
      { path: "/scout/search", element : <SearchPage/> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
