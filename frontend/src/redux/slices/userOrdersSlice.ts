import { createSlice } from "@reduxjs/toolkit";

type SliceState =
  | []
  | {
      _id: string;
      items: {
        categories: string[];
        description: { en: string; ru: string; pl: string; _id: string };
        images: string[];
        name: string;
        price: number;
        reviews: {}[];
        sizes: string[];
        tastes: string[];
        _id: string;
      }[];
      contacts: {};
      date: string | Date;
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
