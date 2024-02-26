import matchReducer from "./match";
import playerReducer from "./player";
import scoutReducer from "./scout";
import userReducer from "./user";

const reducer: any = {
  user: userReducer,
  player: playerReducer,
  scout: scoutReducer,
  match: matchReducer
}

export default reducer;