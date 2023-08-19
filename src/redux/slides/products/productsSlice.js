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
    const response = await axios.get(`/coffee?name=${searchTerm}`);
    return { searchTerm, data: response.data? response.data : 'not found' }; // Retorna tanto el término de búsqueda como los datos
  } catch (error) {
    throw error;
  }
});

export const filtredProducts = createAsyncThunk('product/filtredProducts', async (filters, { getState }) => {
  try {
    const { actualSearch } = getState().product; // Obtén el valor de actualSearch del estado
    console.log('INICIANDO');
    console.log(`
    /coffee?name=${actualSearch}&origin=${filters.origin}&roastingProfile=${filters.roastingProfile}&typeOfCoffee=${filters.typeOfCoffee}
    `);
    
    const response = await axios.get(`/coffee?name=${actualSearch}&origin=${filters.origin}&roastingProfile=${filters.roastingProfile}&typeOfCoffee=${filters.typeOfCoffee}`);
    
    if(filters.priceMin) response.data.sort((a, b) => a.price - b.price);
    if(filters.priceMax) response.data.sort((a, b) => b.price - a.price);
    
    return response.data? response.data : 'not found'; 
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
        state.actualSearch = action.payload.searchTerm; // Actualiza el término de búsqueda
        state.filtredProducts = action.payload.data; // Almacena los productos filtrados
      })
      .addCase(filtredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filtredProducts = action.payload;
      });
  },
});


export const { clearFilters } = productSlice.actions; 
export default productSlice.reducer;
