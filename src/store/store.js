import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './reducers/Login'
import productReducer from './reducers/products/productsSlice'; 
import categoriesReducer from './reducers/categoriesSlice/categoriesSlice';
import { shoppingSlice } from './reducers/shopping/shopping';
import userReducer from './reducers/user/userSlice';

export const store = configureStore({
  reducer: {
    login:loginSlice.reducer,
    shopping:shoppingSlice.reducer,
    product: productReducer, 
    categories: categoriesReducer,
    user: userReducer,
  },
})