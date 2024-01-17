import { createSlice } from "@reduxjs/toolkit";

type singleProduct = {
  name: string;
  img: string | null | undefined;
  price: number | string;
  description: string;
  _id: string;
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
    removeListOfProducts(state) {
      return { ...state, listOfProducts: null };
    },
  },
});

export const { addListOfProducts, removeListOfProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
