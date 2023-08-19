// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slides/products/productsSlice.js'; // Importa el slice de productos
import categoriesReducer from './slides/categoriesSlice/categoriesSlice.js';

const store = configureStore({
  reducer: {
    product: productReducer, // Agrega el reducer de productos al store
    // ...otros reducers si los tienes
    categories: categoriesReducer,
  },
});

export default store;
