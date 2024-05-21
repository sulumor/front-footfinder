import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import {
  ReactNode, createContext, useContext, useEffect, useState,
} from "react";
import { PlayerView, ScoutView } from "@/@Types";
import crud from "@/utils/crud";

const AuthContext = createContext({});

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<PlayerView | ScoutView | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasToBeRefetch, setHasToBeRefetch] = useState<boolean>(false);

  useEffect(() => {
    loadUserFromToken()
    if (hasToBeRefetch) {
      loadUserFromToken()
    }
  }, [hasToBeRefetch])

  async function loadUserFromToken(): Promise<void> {
    if (localStorage.getItem("token")){
      setError("");
      try {     
        const res =  await crud.get(["user"], [])
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


  async function login({ email, password }: { email: string; password: string }): Promise<void> {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK}/login`,
        { email, password },
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

  async function getUser(token: { id: number; }) : Promise<void> {
    const response = await crud.get(["player"], [token.id]);
    setUser(response.data)
  }

  function logout(): void {
    localStorage.removeItem("token");
    setUser(null);
    setError("");
  }

  return (
    <AuthContext.Provider value={{
      user, error, loading, login, logout, setHasToBeRefetch
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAuth = (): any => useContext(AuthContext);
