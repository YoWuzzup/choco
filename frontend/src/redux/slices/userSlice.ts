import { createSlice } from "@reduxjs/toolkit";

type SliceState = null | { avatar: string };

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
    userLogout(state, action) {
      return null;
    },
  },
});

export const { userLogin, userRegister, userLogout } = userSlice.actions;
export default userSlice.reducer;
