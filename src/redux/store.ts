import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import sallaryReducer from "./sallary/slice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { AuthState } from "./auth/slice";
import { SallaryState } from "./sallary/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: [],
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

export interface RootState {
  auth: AuthState;
  sallary: SallaryState;
}

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    sallary: sallaryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
