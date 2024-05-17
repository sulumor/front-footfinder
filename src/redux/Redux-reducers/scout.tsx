import {
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import crud from "@/utils/crud";
import { ScoutState } from "@/@Types";
import { UDPATE_SCOUT, UNFOLLOW } from "../Redux-actions/scout";

export const initialState: ScoutState = {
  firstname: "",
  lastname: "",
  email: "",
  club: "",
  city: "",
  players: 0,
  count: 0,
};

export const getScoutInfos = createAsyncThunk(
  "SCOUT",
  async (id : string | null) => {
    const response = await crud.get(["scout"], [Number.parseInt(id!, 10)]);
    return response.data;
  },
);

const scoutReducer = createReducer(initialState, (builder) => {
  builder.addCase(getScoutInfos.fulfilled, (state, action) => {
    state.firstname = action.payload.firstname;
    state.lastname = action.payload.lastname;
    state.email = action.payload.email;
    state.club = action.payload.club;
    state.city = action.payload.city;
    state.players = action.payload.players.length;
  });
  builder.addCase(getScoutInfos.rejected, (_state, action) => {
    console.log("Une erreur est survenue:", action.error.message);
  });
  builder.addCase(UNFOLLOW, (state) => {
    state.players -= 1;
  });
  builder.addCase(UDPATE_SCOUT, (state) => {
    state.count += 1;
  });
});

export default scoutReducer;
