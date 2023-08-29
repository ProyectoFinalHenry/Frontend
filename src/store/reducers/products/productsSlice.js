// productsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  product: [],
  actualSearch: '',
  filtredProducts: false,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  try {
    const response = await axios.get('/coffee');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateActualSearch = createAsyncThunk('product/updateActualSearch', async (searchTerm) => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await axios.get(`/coffee?name=${searchTerm}`);
          resolve({ searchTerm, data: response.data ? response.data : 'not found' });
        } catch (error) {
          reject(error);
        }
      }, 1000); // Simulación de una llamada API de 1 segundo
    });
  } catch (error) {
    throw error;
  }
});

export const filtredProducts = createAsyncThunk('product/filtredProducts', async (filters, { getState }) => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const { actualSearch } = getState().product;
          console.log('INICIANDO');

          let url = `/coffee?`;
          if (actualSearch) url += `name=${actualSearch}`;
          if (filters.origin) url += `&origin=${filters.origin}`;
          if (filters.roastingProfile) url += `&roastingProfile=${filters.roastingProfile}`;
          if (filters.typeOfCoffee) url += `&typeOfCoffee=${filters.typeOfCoffee}`;

          console.log(url);

          const response = await axios.get(url);

          if (filters.priceMin) response.data.sort((a, b) => a.price - b.price);
          if (filters.priceMax) response.data.sort((a, b) => b.price - a.price);

          console.log('DATA: ', response.data);

          resolve(response.data ? response.data : 'not found');
        } catch (error) {
          reject(error);
        }
      }, 1000); // Simulación de una llamada API de 1 segundo
    });
  } catch (error) {
    throw error;
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearFilters: (state) => {
      state.actualSearch = '';
      state.filtredProducts = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateActualSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.actualSearch = action.payload.searchTerm;
        state.filtredProducts = action.payload.data;
      })
      .addCase(updateActualSearch.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateActualSearch.rejected, (state, action) => {
        state.loading = false;
        state.actualSearch = '';
        state.filtredProducts = ['not found'];
      })
      .addCase(filtredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filtredProducts = action.payload;
      });
  },
});

export const { clearFilters } = productSlice.actions;
export default productSlice.reducer;
