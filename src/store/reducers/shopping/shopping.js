import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  total: 0,
};
export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    getCartProduct: (state, action) => {
      state.cart = action.payload;
    },
    deleteCart: (state) => {
      state.cart = state.cart;
    },
    getCantidadGasto: (state) => {
      let price = 0;
      
      let locos = state.cart.reduce(
        (total, gasto) => total + Number(gasto.price) * gasto.quantity,
        0
      );
      price = locos

      state.total = price;
      console.log(price)
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCartProduct, deleteCart, getCantidadGasto } =
  shoppingSlice.actions;
