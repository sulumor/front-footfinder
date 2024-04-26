/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RESPONSE_ERROR, CLEAR_ERROR } from "../Redux-actions/error";

const initialState = {};

export default (state = initialState, action: { type: string; error: any; }) => {
  if (action.type === RESPONSE_ERROR) {
    return {...state, ...action.error};
  }

  if(action.type === CLEAR_ERROR) {
    return initialState;
  }
  
  return state;
}