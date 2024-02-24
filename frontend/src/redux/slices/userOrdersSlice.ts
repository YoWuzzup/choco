import { createSlice } from "@reduxjs/toolkit";

type SliceState =
  | []
  | {
      _id: string;
      name: string;
      description: string;
    }[];

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: [] as SliceState,
  reducers: {
    addToUserOrders(state, action) {
      return [...state, ...action.payload];
    },
    renewUserOrders(state, action) {
      return [...action.payload];
    },
  },
});

export const { addToUserOrders, renewUserOrders } = userOrdersSlice.actions;
export default userOrdersSlice.reducer;
