import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

import Cookies from 'js-cookie';

interface UserState {
  logged: boolean;
  role: string;
  id: any;
  firstname: string
  email: string
}

export const initialState: UserState = {
  logged: false,
  role: "",
  id: null,
  firstname: "",
  email: ""
};

export const login = createAsyncThunk<{
  token: { jwt: string };   
  data: any; 
  email: string;
  password: string 
}>(
  "LOGIN",
  async (formValues) => {
    const response = await axios.post(
      "http://localhost:3000/login",
      formValues 
    );
    Cookies.set('token', response.data.token.jwt);
    console.log("requete terminée");
    console.log(response.data);
    return response.data;
  }
);

export const signin = createAsyncThunk<UserState>(
  "SIGNIN",
  async (formValues) => {
    const response = await axios.post(
      "http://localhost:3000/register",
      formValues 
    );
    console.log("requete signin terminée");
    console.log(response.data);
    return response.data;
  }
);

export const logout = createAction("LOGOUT");
export const tokenCheck = createAction("TOKEN_CHECK");

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
    state.logged = true;
    state.role = action.payload.data.role;
    console.log(action.payload.data.role)
    state.id = action.payload.data.id;
    localStorage.setItem("id", action.payload.data.id);
    localStorage.setItem("logged", "true");
    localStorage.setItem("role", action.payload.data.role);
    localStorage.setItem("token", action.payload.token.jwt);
    localStorage.setItem("firstname", action.payload.data.firstname);
  });
  builder.addCase(login.rejected, (_state, action) => {
    console.log("Une erreur est survenue:", action.error.message);
  });
  builder.addCase(signin.fulfilled, (state, action) => {
    state.logged = true;
    state.role = action.payload.role;
    state.id = action.payload.id;
    localStorage.setItem("email", action.payload.email)
    localStorage.setItem("id", action.payload.id);
    localStorage.setItem("logged", "true");
    localStorage.setItem("role", action.payload.role);
    localStorage.setItem("firstname", action.payload.firstname);
  });
  builder.addCase(signin.rejected, (_state, action) => {
    console.log("Une erreur est survenue:", action.error.message);
  });
  builder.addCase(logout, (state) => {
    state.logged = false; 
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    Cookies.remove('token');
  });
  builder.addCase(tokenCheck,(state,_action)=>{
    state.logged = true;
  });
});

export default userReducer;


/* if (storedToken && storedUserName) {
    StatHelpText.isLogged = true;
    StatHelpText.username
} */