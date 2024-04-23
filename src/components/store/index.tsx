import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import { loadErrors } from "./actions/error";
import axios from 'axios';

const store = configureStore({
  reducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function (error) {   
    store.dispatch(loadErrors(error));
    return Promise.reject(error);
  }
);