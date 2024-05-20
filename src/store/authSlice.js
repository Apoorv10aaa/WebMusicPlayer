import {createSlice} from '@reduxjs/toolkit'

const authSlice=createSlice({
    name:'auth',
    initialState:{
        status:false,
        userData:null
    },
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload;
        },
        logout:(state)=>{
            state.status=false;
            state.userData=null;
        },
        // updateUserData(state,action){
        //     state.userData=action.payload;
        // }
    }
})

export const {login,logout}=authSlice.actions;

export default authSlice.reducer;
