import { createSlice } from "@reduxjs/toolkit";

type UserBookmarksSlice =
  | []
  | {
      _id: string;
      name: string;
      price: number;
      description: string;
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
