import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "asd" },
  reducers: {
    userLogin(state, action) {
      state.name = "me";
    },
  },
});

export const { userLogin } = userSlice.actions;
export default userSlice.reducer;
