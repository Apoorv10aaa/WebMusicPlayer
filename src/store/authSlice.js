import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: false,
    userData: null,
    userInfo: null,
  },
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.userInfo = null;
    },
  },
});

export const { login, logout, updateUserInfo } = authSlice.actions;

export default authSlice.reducer;
