import { createSlice } from "@reduxjs/toolkit";
import {bookData} from "../../booksData"
const bookSlice = createSlice({
    name:"book",
    initialState:bookData,
    reducers:{
        deleteBook : (state, action) =>{
            return state.filter(book => book.id !== action.payload)
        }
    }
})
export const {deleteBook} = bookSlice.actions;
export default bookSlice.reducer;