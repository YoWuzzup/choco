import { createSlice } from "@reduxjs/toolkit";

type TsingleProduct = {
  _id: string;
  name: string;
  price: number | string;
  description: { en: string; ru: string; pl: string };
  reviews: string[];
  sizes: string[];
  tastes: string[];
  colors: string[];
  categories: string[];
  images: string[];
  cart: string[];
  likes: string[];
};

type ProductsState = {
  singleProduct: TsingleProduct | null;
  bestSellerProducts: TsingleProduct[] | null;
  listOfProducts: TsingleProduct[] | null;
};

const initialState: ProductsState = {
  singleProduct: null,
  bestSellerProducts: null,
  listOfProducts: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addBestSellerProducts(state, action) {
      return { ...state, bestSellerProducts: [...action.payload] };
    },
    removeBestSellerProducts(state) {
      return { ...state, bestSellerProducts: null };
    },
    addListOfProducts(state, action) {
      return { ...state, listOfProducts: [...action.payload] };
    },
    removeListOfProducts(state) {
      return { ...state, listOfProducts: null };
    },
    addSingleProduct(state, action) {
      return { ...state, singleProduct: { ...action.payload } };
    },
  },
});

export const {
  addListOfProducts,
  removeListOfProducts,
  addSingleProduct,
  addBestSellerProducts,
  removeBestSellerProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
