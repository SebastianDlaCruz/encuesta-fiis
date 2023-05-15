import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./appSlice";

const store = configureStore({
    reducer:{
        app: appSlice.reducer
    }
})

export type AppStoreState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;