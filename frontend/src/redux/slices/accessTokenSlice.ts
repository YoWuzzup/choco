import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SliceState = null | string;

const accessTokenSlice = createSlice({
  name: "access_token",
  initialState: null as SliceState,
  reducers: {
    saveAccessTokenToRedux(state, action: PayloadAction<string>) {
      state = action.payload;

      return state;
    },
    removeAccessTokenFromRedux(state) {
      return null;
    },
  },
});

export const { saveAccessTokenToRedux, removeAccessTokenFromRedux } =
  accessTokenSlice.actions;
export default accessTokenSlice.reducer;
