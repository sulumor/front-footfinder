import {
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axios from "axios";

interface ScoutState {
    firstname: string,
    lastname: string,
    email: string,
    club: string,
    city: string
};

export const initialState: ScoutState = {
    firstname: "",
    lastname: "",
    email: "",
    club: "",
    city: ""
};

export const getScoutInfos = createAsyncThunk<ScoutState>(
  "SCOUT",
  async (id) => {
    const response = await axios.get(`http://localhost:3000/scout/${id}`);
    console.log("requete scout terminée");
    console.log(response.data);
    return response.data;
  }
);

const scoutReducer = createReducer(initialState, (builder) => {
  builder.addCase(getScoutInfos.fulfilled, (state, action) => {
    state.firstname = action.payload.firstname;
    state.lastname = action.payload.lastname;
    state.email = action.payload.email;
    state.club = action.payload.club;
    state.city = action.payload.city;
  });
  builder.addCase(getScoutInfos.rejected, (_state, action) => {
    console.log("Une erreur est survenue:", action.error.message);
  });
});

export default scoutReducer;
