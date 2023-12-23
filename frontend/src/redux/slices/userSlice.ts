import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "" },
  reducers: {
    userLogin(state, action) {
      state.name = "me";
    },
    userRegister(state, action) {
      console.log("state:", state);
      console.log("action:", action);
    },
  },
});

export const { userLogin, userRegister } = userSlice.actions;
export default userSlice.reducer;
