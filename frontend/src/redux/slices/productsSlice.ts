import { createSlice } from "@reduxjs/toolkit";

type singleProduct = {
  name: string;
  minprice: number;
  maxprice: number;
  description: string;
};

type ProductsState = {
  singleProduct: singleProduct | null;
  listOfProducts: singleProduct[] | null;
};

const initialState: ProductsState = {
  singleProduct: null,
  listOfProducts: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addListOfProducts(state, action) {
      return { ...state, listOfProducts: [...action.payload] };
    },
  },
});

export const { addListOfProducts } = productsSlice.actions;
export default productsSlice.reducer;
