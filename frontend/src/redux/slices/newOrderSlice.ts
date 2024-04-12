import { createSlice } from "@reduxjs/toolkit";

type SliceState = null | {
  items: string[];
  additionalData: {
    message: string;
    selfPickup: boolean;
    totalPrice: number;
    dateToMakeOrder: {
      startDate: string;
      endDate: string;
    };
  };
  contacts: {};
  date: string;
};

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState: null as SliceState,
  reducers: {
    addToNewOrder(state, action) {
      return { ...action.payload };
    },
  },
});

export const { addToNewOrder } = newOrderSlice.actions;
export default newOrderSlice.reducer;
