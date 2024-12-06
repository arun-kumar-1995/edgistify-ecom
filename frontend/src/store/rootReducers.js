import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.Slice";

export const rootReducers = combineReducers({
  auth: authReducer,
});
