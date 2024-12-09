import { configureStore } from "@reduxjs/toolkit";
import { rootReducers } from "./rootReducers";
import { composeWithDevTools } from "@redux-devtools/extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "_app",
  storage,  
  whitelist: ["auth", "settings"]
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: composeWithDevTools({
    trace: true,
    traceLimit: 25,
  }),
});

export const persistor = persistStore(Store);
