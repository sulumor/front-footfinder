import matchReducer from "./match";
import playerReducer from "./player";
import scoutReducer from "./scout";
import userReducer from "./user";
import error from "./error";

const reducer: any = {
  user: userReducer,
  player: playerReducer,
  scout: scoutReducer,
  match: matchReducer,
  error,
};

export default reducer;
