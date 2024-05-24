import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    isPlaying: false,
    next: null,
    prev: {},
  },
  reducers: {
    playPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    volumeCntrl: (state, action) => {
      state.volume = action.payload;
    },
    updateNext: (state, action) => {
      state.next = action.payload;
    },
    emptyPrev: (state) => {
      state.prev = [];
    },
    updatePrev: (state, action) => {
      state.prev = action.payload;
    },
  },
});

export const { playPause, volumeCntrl, updateNext, updatePrev, emptyPrev } =
  playerSlice.actions;

export default playerSlice.reducer;
