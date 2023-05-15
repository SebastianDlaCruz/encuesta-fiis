import { configureStore } from "@reduxjs/toolkit";
import { adminSlice } from "./adminSlice";

const store = configureStore({
    reducer:{
        admin: adminSlice.reducer
    }
})

export type AdminStoreState = ReturnType<typeof store.getState>;

export type AdminDispatch = typeof store.dispatch;

export default store;