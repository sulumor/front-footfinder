/* eslint-disable @typescript-eslint/no-unused-vars */
import { PlayerState } from "@/@Types";
import crud from "@/utils/crud";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { UDPATE_PLAYER, UPDATE_MATCH } from "../Redux-actions/player";


export const initialState: PlayerState = {
  id: 0,
  player_id: 0,
  role: "",
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
  weight: 0,
  scouts: [],
  teams: [],
  count: 0
};

export const getPlayerInfos = createAsyncThunk(
  "PLAYER",
  async (id:string | null) => {
    const response = await crud.get(['player'], [Number.parseInt(id!, 10)]);
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
    state.scouts = action.payload.scouts;
    state.teams = action.payload.teams;
    state.role = action.payload.role;
  });
  builder.addCase(getPlayerInfos.rejected, (_state, action) => {
    console.log("Une erreur est survenue:", action.error.message);
  });
  builder.addCase(UDPATE_PLAYER, (state, _action) => {
    state.count = state.count +1;
  });
  builder.addCase(UPDATE_MATCH, (state, _action) => {
    state.count = state.count -1;
  })
});

export default playerReducer;
