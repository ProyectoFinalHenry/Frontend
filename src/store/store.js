import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './reducers/Login'
import productReducer from './reducers/products/productsSlice'; 
import categoriesReducer from './reducers/categoriesSlice/categoriesSlice';
import { shoppingSlice } from './reducers/shopping/shopping';

export const store = configureStore({
  reducer: {
    login:loginSlice.reducer,
    shopping:shoppingSlice.reducer,
    product: productReducer, 
    categories: categoriesReducer,
  },
})