import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { UserState } from "@/@Types";

export const initialState: UserState = {
  logged: false,
  role: undefined,
  id: 0,
  firstname: "",
  email: "",
  pwd:"",
};


export const login = createAsyncThunk(
  "LOGIN",
  async (formValues : {email:string;password:string;role:string}) => {   
    const response = await axios.post(
      "https://back-footfinder.onrender.com/login",
      formValues 
    );
    return response.data.accessToken;
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
      "https://back-footfinder.onrender.com/register",
      formValues 
    );   
    return response.data;
  }
);

export const logout = createAction("LOGOUT");
export const tokenCheck = createAction("TOKEN_CHECK");

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
    const user: JwtPayload & UserState = jwtDecode(action.payload);
    state.logged = true;
    state.role = user.role;
    state.id = user.id;
    localStorage.setItem("id", user.id as unknown as string);
    localStorage.setItem("logged", "true");
    localStorage.setItem("role", user.role!);
    localStorage.setItem("token", action.payload);
    localStorage.setItem("firstname", user.firstname);
  });
  builder.addCase(login.rejected, (_state, action) => {
    console.log("Une erreur est survenue:", action.error.message);
  });
  builder.addCase(signin.fulfilled, (state, action) => {
    state.logged = true;
    state.role = action.payload.user.role;
    state.id = action.payload.user.id;
    state.pwd = action.payload.pwd;
    localStorage.setItem("id", `${action.payload.user.id}` );
    localStorage.setItem("logged", "true");
    localStorage.setItem("role", action.payload.user.role);
    localStorage.setItem("firstname", action.payload.user.firstname);
    localStorage.setItem("email", action.payload.user.email);
  });
  builder.addCase(signin.rejected, (_state, action) => {
    console.log("Une erreur est survenue:", action.error.message);
  });
  builder.addCase(logout, (state) => {
    state.logged = false; 
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("logged");
    localStorage.removeItem("firstname");
    localStorage.removeItem("email");
  });
  builder.addCase(tokenCheck,(state: UserState,)=>{
    state.logged = true;
    state.role = localStorage.getItem("role") || undefined;
  });
});

export default userReducer;