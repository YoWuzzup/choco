import { createSlice } from "@reduxjs/toolkit";

type SliceState = null | {
  _id: string;
  avatar:
    | {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        buffer: string;
        size: number;
      }
    | string
    | File;
  likes: string[];
  name: string;
  contacts: {
    lineOne: string;
    lineTwo: string;
    city: string;
    zip: string;
    phoneNumber: string;
  };
  email: string;
  cart: string[];
  reviews: string[];
  orders: [] | string[];
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
