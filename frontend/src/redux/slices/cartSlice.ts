import { createSlice } from "@reduxjs/toolkit";

type singleProduct = {
  _id: string;
  priceForOne: number | string;
  amount: string | number;
  filters?: {
    sizes?: string[] | string;
    tastes?: string[] | string;
    colors?: string[] | string;
  };
};

const initialState: singleProduct[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log(action.payload);

      return [...state, ...action.payload];
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
