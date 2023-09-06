import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null, // Cambiado de [] a null
};

export const getUserData = createAsyncThunk('user/getUserData', async () => {
  try {
    
    const token = localStorage.getItem("tokens");

    const config = {
        headers: {
            auth_token: token,
        },
    }

    const userData = await axios.get('/user', config);
    console.log(userData.data);
    return userData.data;
  } catch (error) {
    console.error(error);
    throw error; // Lanzar el error para que pueda ser manejado en el reductor rejected
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload; // Cambiado de userData a user
      })
      .addCase(getUserData.rejected, (state, action) => {
        // Puedes manejar el error aquí, por ejemplo, estableciendo un mensaje de error en el estado.
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
