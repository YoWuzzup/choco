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
    addUserBookmark(state, action) {
      return [...action.payload];
    },
  },
});

export const { addUserBookmark } = userBookmarksSlice.actions;
export default userBookmarksSlice.reducer;
