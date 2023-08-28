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
    }
});


// Action creators are generated for each case reducer function
export const { getCartProduct } = shoppingSlice.actions;