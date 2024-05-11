import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import playerReducer from './playerSlice'
import songReducer from './songSlice'
import uiReducer from './uiSlice'

const store=configureStore({
    reducer:{
        authReducer,
        playerReducer,
        songReducer,
        uiReducer
    }
})

export default store;