import playerReducer from "./player";
import scoutReducer from "./scout";
import userReducer from "./user";

const reducer = {
  user: userReducer,
  player: playerReducer,
  scout: scoutReducer,
}

export default reducer;