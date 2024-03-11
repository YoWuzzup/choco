import { createSlice } from "@reduxjs/toolkit";

type Treviews = {
  _id: string;
  userId: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  title: string;
  date: Date;
};

const initialState: Treviews[] = [];

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReviews(state, action) {
      return [...action.payload];
    },
  },
});

export const { addReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
