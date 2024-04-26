import { createSlice } from "@reduxjs/toolkit";

const playerSlice=createSlice({
    name:'player',
    initialState:{
        isPlaying:false,
        next:null,
        prev:[],
        volume:100
    },
    reducers:{
        playPause:(state)=>{
            state.isPlaying=!state.isPlaying;
        },
        volumeCntrl:(state,action)=>{
            state.volume=action.payload;
        },
        playNext:(state,action)=>{
            state.prev=state.prev.push(action.payload.trackId);
        },
        emptyPrev:(state)=>{
            state.prev=[];
        },
        playPrev:(state)=>{
            state.prev=state.prev.pop();
        }
    }
})

export const {playPause,volumeCntrl,playNext,playPrev,emptyPrev} =playerSlice.actions;

export default playerSlice.reducer;