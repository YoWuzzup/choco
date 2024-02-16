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
    addUserCart(state, action) {
      return [...state, ...action.payload];
    },
  },
});

export const { addUserCart } = userCartSlice.actions;
export default userCartSlice.reducer;
