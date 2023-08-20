import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    try {
        const responseOrigin = await axios.get('category/Origin');
        const responseRoastingProfile = await axios.get('category/RoastingProfile');
        const responseTypeOfCoffee = await axios.get('category/TypeOfCoffee');

        return {
            origin: responseOrigin.data,
            roastingProfile: responseRoastingProfile.data,
            typeOfCoffee: responseTypeOfCoffee.data
        };
    } catch (error) {
        throw error;
    }
});
const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        origin: [],
        roastingProfile: [],
        typeOfCoffee: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.origin = action.payload.origin;
            state.roastingProfile = action.payload.roastingProfile;
            state.typeOfCoffee = action.payload.typeOfCoffee;
        });
    }
});

export default categoriesSlice.reducer;

// Exporta la acción asincrónica para su uso en componentes
//export { fetchCategories };
