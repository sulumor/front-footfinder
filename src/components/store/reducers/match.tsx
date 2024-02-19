import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

interface MatchState {
  id: {
    match_id: number;
    score: string;
    team_id_as_home: {
      adress: string;
      city: string;
      club_name: string;
      logo: string;
      season: string;
      team_id: number;
      zipcode: number;
    };
    team_id_as_outside: {
      adress: string;
      city: string;
      club_name: string;
      logo: string;
      season: string;
      team_id: number;
      zipcode: number;
    };
  };
}

export const initialState: MatchState = {
  id: {
    match_id: 0,
    score: "",
    team_id_as_home: {
      adress: "",
      city: "",
      club_name: "",
      logo: "",
      season: "",
      team_id: 0,
      zipcode: 0,
    },
    team_id_as_outside: {
      adress: "",
      city: "",
      club_name: "",
      logo: "",
      season: "",
      team_id: 0,
      zipcode: 0,
    },
  },
};

export const getAllMatchs = createAsyncThunk<MatchState>(
  "ALLMATCH",
  async (id) => {
    const response = await axios.get(
      `http://localhost:3000/player/${id}/match`
    );
    console.log("requete allmatchs terminée");
    console.log(response.data);
    return response.data;
  }
);

const matchReducer = createReducer(initialState, (builder) => {
  builder.addCase(getAllMatchs.fulfilled, (state, action) => {
   /* state.id.match_id = action.payload.match_id;
    state.id.score = action.payload.score;
    console.log(action.payload.score)
    state.id.team_id_as_home.adress = action.payload.id.team_id_as_home.adress;
    
    state.team_id_as_home.city = action.payload.team_id_as_home.city;
    state.team_id_as_home.club_name = action.payload.team_id_as_home.club_name;
    state.team_id_as_home.logo = action.payload.team_id_as_home.logo;
    state.team_id_as_home.season = action.payload.team_id_as_home.season;
    state.team_id_as_home.team_id = action.payload.team_id_as_home.team_id;
    state.team_id_as_home.zipcode = action.payload.team_id_as_home.zipcode;
    state.team_id_as_outside.adress = action.payload.team_id_as_outside.adress; 
    state.team_id_as_outside.city = action.payload.team_id_as_outside.city;
    state.team_id_as_outside.club_name = action.payload.team_id_as_outside.club_name;
    state.team_id_as_outside.logo = action.payload.team_id_as_outside.logo;
    state.team_id_as_outside.season = action.payload.team_id_as_home.season;
    state.team_id_as_outside.team_id = action.payload.team_id_as_outside.team_id;
    state.team_id_as_outside.zipcode = action.payload.team_id_as_outside.zipcode;*/
  });
  builder.addCase(getAllMatchs.rejected, (_state, action) => {
    console.log("Une erreur est survenue:", action.error.message);
  });
});

export default matchReducer;
