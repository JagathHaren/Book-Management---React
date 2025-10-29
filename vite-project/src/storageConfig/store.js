import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../slices/bookSlice"
import cartSlice from "../slices/cartSlice";

const store = configureStore({
    reducer:{
        books:booksReducer,
        cart: cartSlice
    }
})

export default store;