import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./rootReducers";

export const Store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  //   devTools: process.env.NODE_ENV !== "production",
});
