import playerReducer from "./player";
import userReducer from "./user";

const reducer = {
  user: userReducer,
  player: playerReducer
}

export default reducer;