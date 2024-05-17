import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import reducer from "./Redux-reducers";
// import { loadErrors } from "./actions/error";

const store = configureStore({
  reducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

axios.interceptors.response.use(
  (response) => response,
  // function (error) {
  //   store.dispatch(loadErrors(error));
  //   return Promise.reject(error);
  // }
);
