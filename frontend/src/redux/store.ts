import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import accessTokenReducer from "./slices/accessTokenSlice";
import productsReducer from "./slices/productsSlice";
import userBookmarksReducer from "./slices/userBookmarksSlice";
import userCartReducer from "./slices/userCartSlice";
import userOrdersReducer from "./slices/userOrdersSlice";
import newOrderSlice from "./slices/newOrderSlice";
import reviewsSliceReducer from "./slices/reviewsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      access_token: accessTokenReducer,
      products: productsReducer,
      userBookmarks: userBookmarksReducer,
      userCart: userCartReducer,
      userOrders: userOrdersReducer,
      newOrder: newOrderSlice,
      reviews: reviewsSliceReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
