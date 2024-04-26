import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import playerReducer from './playerSlice'
import songReducer from './songSlice'

const store=configureStore({
    reducer:{
        authReducer,
        playerReducer,
        songReducer
    }
})

export default store;