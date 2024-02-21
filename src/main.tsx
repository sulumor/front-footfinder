import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { createBrowserRouter } from "react-router-dom";
import Test from "@/pages/test/test.tsx";
import ErrorPage from "@/components/Error/Error";
import Login from "@/components/Login/Login";
import Home from "@/components/Home/Home";
import Signin from "@/components/Signin/Signin";
import Notices from "@/components/Notices/Notices";
import Player from "@/components/Player/Player";
import Match from "@/components/Match/Match";
import Stats from "@/components/Stats/Stats";
import Scout from "@/components/Scout/Scout";
import PlayerProfil from "@/components/PlayerProfil/PlayerProfil";
import App from "./components/App/App";
import PlayerForScout from "./components/PlayerForScout/PlayerForScout";

import store from "./components/store";
import SearchPlayer from "./components/Form/SearchPlayer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signin", element: <Signin /> },
      { path: "/notices", element: <Notices /> },
      { path: "/player", element: <Player /> },
      { path: "/player/:id", element: <PlayerForScout />},
      { path: "/player/match", element: <Match /> },
      { path: "/player/match/:matchId", element: <Stats /> },
      { path: "/scout", element: <Scout /> },
      { path: "/player/me", element: <PlayerProfil /> },
      { path: "/test", element: <Test /> },
      {path: "/scout/search", element : <SearchPlayer/>},
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
