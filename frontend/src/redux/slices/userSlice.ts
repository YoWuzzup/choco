import { ReactNode } from "react";
import { createSlice } from "@reduxjs/toolkit";

type SliceState = null | {
  _id: string;
  avatar: string;
  likes: string[];
  name: string;
  email: string;
  cart: [] | string[];
};

const userSlice = createSlice({
  name: "user",
  initialState: null as SliceState,
  reducers: {
    userLogin(state, action) {
      return { ...action.payload };
    },
    userRegister(state, action) {
      return { ...action.payload };
    },
    userUpdate(state, action) {
      return { ...state, ...action.payload };
    },
    userLogout() {
      return null;
    },
  },
});

export const { userLogin, userRegister, userLogout, userUpdate } =
  userSlice.actions;
export default userSlice.reducer;
