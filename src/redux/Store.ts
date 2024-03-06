import { configureStore } from "@reduxjs/toolkit";
import { slicereducer } from "./reducer/Slice";
import { SliderReducer } from "./reducer/productsSlice";

export const store = configureStore({
    reducer: {
        home: slicereducer,
        products: SliderReducer
    }
})

export type Appdispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>