import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const rootReducers = combineReducers({
  auth: authReducer,
});
