import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    userLogin(state, action) {
      return { ...state, ...action.payload };
    },
    userRegister(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { userLogin, userRegister } = userSlice.actions;
export default userSlice.reducer;
