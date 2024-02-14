import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import accessTokenReducer from "./slices/accessTokenSlice";
import productsReducer from "./slices/productsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      access_token: accessTokenReducer,
      products: productsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
