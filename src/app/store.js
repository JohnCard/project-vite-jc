import { configureStore } from "@reduxjs/toolkit";
import stateReducer from '../features/stateSlacers.js'

export const store = configureStore({
    reducer: {
        stateManage: stateReducer
    }
})