import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "@/@Types";

import Cookies from 'js-cookie';

export const initialState: UserState = {
  logged: false,
  role: "",
  id: 0,
  firstname: "",
  email: ""
};

export const login = createAsyncThunk(
  "LOGIN",
  async (formValues : {email:string;password:string;role:string}) => {
    const response = await axios.post(
      "http://localhost:3000/login",
      formValues 
    );
    Cookies.set('token', response.data.token.jwt);
    return response.data;
  }
);

export const signin = createAsyncThunk(
  "SIGNIN",
  async (formValues : {
    role: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmedPassword: string;
}) => {
    const response = await axios.post(
      "http://localhost:3000/register",
      formValues 
    );
    return response.data;
  }
);

export const logout = createAction("LOGOUT");
export const tokenCheck = createAction("TOKEN_CHECK");

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
    state.logged = true;
    state.role = action.payload.data.role;
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
    localStorage.setItem("id", `${action.payload.id}` );
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
  builder.addCase(tokenCheck,(state: UserState,)=>{
    state.logged = true;
    state.role = localStorage.getItem("role");
  });
});

export default userReducer;