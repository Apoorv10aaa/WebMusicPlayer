import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import playerReducer from './playerSlice'
import songReducer from './songSlice'
import uiReducer from './uiSlice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        player:playerReducer,
        song:songReducer,
        ui:uiReducer
    }
})

export default store;