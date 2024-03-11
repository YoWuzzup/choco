import { createSlice } from "@reduxjs/toolkit";

type UserBookmarksSlice =
  | []
  | {
      _id: string;
      name: string;
      price: number;
      description: { en: string; ru: string; pl: string };
      images: string[];
    }[];

const userBookmarksSlice = createSlice({
  name: "userBookmarks",
  initialState: [] as UserBookmarksSlice,
  reducers: {
    addToUserBookmarks(state, action) {
      return [...state, ...action.payload];
    },
    renewUserBookmarks(state, action) {
      return [...action.payload];
    },
  },
});

export const { addToUserBookmarks, renewUserBookmarks } =
  userBookmarksSlice.actions;
export default userBookmarksSlice.reducer;
