import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state, action) =>{
            const existing = state.find(item => item.id === action.payload.id);
            if(!existing){
                state.push(action.payload)
            }else{
                alert("already exist");
                return;
            }
        },

        removeFromCart :(state, action) =>{
            return state.filter(item => item.id !== action.payload);
        },
        clearCart:()=>[]

    }
})
export const  {addToCart, removeFromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;