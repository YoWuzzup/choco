import { createSlice } from "@reduxjs/toolkit";

type SliceState =
  | []
  | {
      _id: string;
      name: string;
      description: string;
    }[];

const userCartSlice = createSlice({
  name: "userCart",
  initialState: [] as SliceState,
  reducers: {
    clearUserCart() {
      return [];
    },
    addToUserCart(state, action) {
      return [...state, ...action.payload];
    },
    renewUserCart(state, action) {
      return [...action.payload];
    },
  },
});

export const { addToUserCart, renewUserCart, clearUserCart } =
  userCartSlice.actions;
export default userCartSlice.reducer;
