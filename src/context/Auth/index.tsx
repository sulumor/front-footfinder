import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import {
  ReactNode, createContext, useContext, useEffect, useState,
} from "react";
import { Login, Match, PlayerView, ScoutView, Signup } from "@/@Types";
import crud from "@/utils/crud";

const AuthContext = createContext({});

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<PlayerView | ScoutView | null>(null);
  const [userGames, setUserGames] = useState<Match[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasToBeRefetch, setHasToBeRefetch] = useState<boolean>(false);

  useEffect(() => {
    async function loadUserFromToken(): Promise<void> {
      if (localStorage.getItem("token")){
        setError("");
        try {     
          const res =  await crud.get(["user"], []);
          getUser(res.data);
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.message === "Network Error") setError("Erreur dans le réseau");
            if (error.message.includes("failed")) setError(error.response?.data.error);
            setLoading(false);
          }
        }  
      }
    }
    loadUserFromToken();
    if (hasToBeRefetch) {
      loadUserFromToken();
    }
  }, [hasToBeRefetch]);



  async function login(body: Login): Promise<void> {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK}/login`,
        body,
      );     
      setLoading(false);
      localStorage.setItem("token", response.data.accessToken);
      getUser(jwtDecode(response.data.accessToken));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.message === "Network Error") setError("Erreur dans le réseau");
        if (error.message.includes("failed")) setError(error.response?.data.error);
        setLoading(false);
      }
    }
  }

  async function getUser(token: { id: number; role: string }) : Promise<void> {
    const role : "" | "player" | "scout" = token.role === "joueur" ? "player" : token.role === "recruteur" ? "scout" : "";
    const response = await crud.get([role], [token.id]);
    setUser(response.data);
    if (response.data.role === "joueur"){
      const res = await crud.get(["player", "match", "stats"], [token.id]);
      setUserGames(res.data);
    }
  }

  async function signup(body : Signup ) : Promise<void> {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK}/register`, 
        body,
      );
      setLoading(false);
      localStorage.setItem("token", response.data.accessToken);
      getUser(jwtDecode(response.data.accessToken));
      return jwtDecode(response.data.accessToken);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.message === "Network Error") setError("Erreur dans le réseau");
        if (error.message.includes("failed")) setError(error.response?.data.error);
        setLoading(false);
      }
    }
  }

  function logout(): void {
    localStorage.removeItem("token");
    setUser(null);
    setError("");
  }

  return (
    <AuthContext.Provider value={{
      user, error, loading, login, logout, setHasToBeRefetch, getUser, userGames, signup
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAuth = (): any => useContext(AuthContext);
