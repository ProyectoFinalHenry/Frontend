import { createSlice } from '@reduxjs/toolkit';

const initialState= {
    cart:[]
}
export const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        getCartProduct: (state, action ) => {
            state.cart = action.payload
        },
        deleteCart: (state) =>{
            console.log('hola')
            state.cart = []
        }
    }
});


// Action creators are generated for each case reducer function
export const { getCartProduct , deleteCart } = shoppingSlice.actions;