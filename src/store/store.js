import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './reducers/Login'
import productReducer from './reducers/products/productsSlice'; 
import categoriesReducer from './reducers/categoriesSlice/categoriesSlice';

export const store = configureStore({
  reducer: {
    login:loginSlice.reducer,
    product: productReducer, 
    categories: categoriesReducer,
  },
})