import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    currentSource: "home",
    id: null,
    displayAddSong: false,
  },
  reducers: {
    setUI: (state, action) => {
      state.currentSource = action.payload.currentSource;
      state.displayAddSong = action.payload.displayAddSong;
      state.id = action.payload.id;
    },
  },
});

export const { setUI } = uiSlice.actions;
export default uiSlice.reducer;
