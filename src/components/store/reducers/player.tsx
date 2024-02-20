import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

interface PlayerState {
  firstname: string;
  lastname: string;
  email: string;
  position: string;
  birth_date: string;
  nationality: string;
  avatar: string;
  genre: string;
  strong_foot: string;
  number_of_matches_played: number;
  height: number;
  weight: number;
}

export const initialState: PlayerState = {
  firstname: "",
  lastname: "",
  email: "",
  position: "",
  birth_date: "",
  nationality: "",
  avatar: "",
  genre: "",
  strong_foot: "",
  number_of_matches_played: 0,
  height: 0,
  weight: 0
};

export const getPlayerInfos = createAsyncThunk<PlayerState>(
  "PLAYER",
  async (id) => {
    const response = await axios.get(`http://localhost:3000/player/${id}`);
    console.log("requete player terminée");
    console.log(response.data);
    return response.data;
  }
);

const playerReducer = createReducer(initialState, (builder) => {
  builder.addCase(getPlayerInfos.fulfilled, (state, action) => {
    state.firstname = action.payload.firstname;
    state.lastname = action.payload.lastname;
    state.email = action.payload.email;
    state.position = action.payload.position;
    state.birth_date = action.payload.birth_date;
    state.nationality = action.payload.nationality;
    state.avatar = action.payload.avatar;
    state.genre = action.payload.genre;
    state.strong_foot = action.payload.strong_foot;
    state.number_of_matches_played = action.payload.number_of_matches_played;
    state.height = action.payload.height;
    state.weight = action.payload.weight;
  });
  builder.addCase(getPlayerInfos.rejected, (_state, action) => {
    console.log("Une erreur est survenue:", action.error.message);
  });
});

export default playerReducer;
