import { createSlice } from "@reduxjs/toolkit";

const songSlice=createSlice({
    name:'song',
    initialState:{
        songId:null,
        songData:null
    },
    reducers:{
        updateSong:(state,action)=>{
            state.songId=action.payload.trackId;
            state.songData=action.payload;
        }
    }
})

export const {updateSong} =songSlice.actions;
export default songSlice.reducer;