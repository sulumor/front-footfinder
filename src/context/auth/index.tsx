/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext, useEffect, ReactNode, Context } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


const AuthContext : Context<object> = createContext({});

const url = { api: 'http://localhost:3000'};

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>('');
  const [error, setError] = useState('');
  const [hasToBeRefetch, setHastoBeRefetch] = useState(false);


/*  async function loadUserFromCookies(): Promise<void> {
    const token = Cookies.get('token');
    if (token) {
      try {
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await axios.get(`${url.api}/user`);
        if (user) {
          setUser(user);
          setRole(user.role.name);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setError(error.message);
        }
      }
    }
    setHastoBeRefetch(false);
  }
  

  useEffect(() => {
    loadUserFromCookies();
    if (hasToBeRefetch) {
      loadUserFromCookies();
    }
  }, [hasToBeRefetch]);

  */

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      const res = await axios.post(`${url.api}/login`, { email, password });
      console.log(res);
      
      Cookies.set('token', res.data.token.jwt);
      setUser(res.data.data);
      setRole(res.data.data.role);
      setError('');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      }
    }
  }

  async function register({
    password,
    firstname,
    lastname,
    email,
    role,
  }: {
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string | number;
  }): Promise<void> {
    try {
      const res = await axios.post(`${url.api}/register`, {
        password,
        firstname,
        lastname,
        email,
        role,
      });
      Cookies.set('token', res.data.jwt);
      setUser(res.data.user);
      setRole(res.data.user.role.name);
      setError('');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      }
    }
  }

  function logout(): void {
    Cookies.remove('token');
    setUser(null);
    setRole('');
   //TODO route to home
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!Cookies.get('token'),
        user,
        logout,
        login,
        error,
        setHastoBeRefetch,
        register,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAuth = (): any => useContext(AuthContext);