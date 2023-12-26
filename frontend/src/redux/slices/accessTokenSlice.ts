import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const accessTokenSlice = createSlice({
  name: "access_token",
  initialState: "",
  reducers: {
    saveAccessTokenToRedux(state, action: PayloadAction<string>) {
      state = action.payload;

      return state;
    },
    removeAccessTokenFromRedux(state) {
      return (state = "");
    },
  },
});

export const { saveAccessTokenToRedux, removeAccessTokenFromRedux } =
  accessTokenSlice.actions;
export default accessTokenSlice.reducer;
