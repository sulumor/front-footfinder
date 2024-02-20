import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

interface MatchState {
  match_id: number
}

export const initialState: MatchState = {
  match_id: 0
};

export const getMatchId = createAsyncThunk<MatchState>(
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
  builder.addCase(getMatchId.fulfilled, (state, action) => {
   state.match_id = action.payload.match_id;
  });
  builder.addCase(getMatchId.rejected, (_state, action) => {
    console.log("Une erreur est survenue:", action.error.message);
  });
});

export default matchReducer;
