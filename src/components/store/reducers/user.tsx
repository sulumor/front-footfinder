import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  logged: boolean;
  role: string | null;
}

export const initialState: UserState = {
  logged: false,
  role: null,
};

export const login = createAsyncThunk<{ email: string; password: string }>(
  "LOGIN",
  async (formValues) => {
    const response = await axios.post(
      "http://localhost:3000/login",
      formValues 
    );
    console.log("requete terminée");
    return response.data;
  }
);

export const logout = createAction("LOGOUT");

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
    state.logged = true;
    state.role = action.payload.data.role;
  });
  builder.addCase(login.rejected, (_state, action) => {
    console.log("Une erreur est survenue:", action.error.message);
  });
  builder.addCase(logout, (state) => {
    state.logged = false;
    state.role = null;
  });
});

export default userReducer;
