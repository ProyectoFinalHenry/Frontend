import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    LoginAndLogOut : false,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        getLoginAndLogOut: (state, /* action */ ) => {
            state.LoginAndLogOut = true;
        },
        getLogOut: (state) =>{
            state.LoginAndLogOut = false
        }
    }
});


// Action creators are generated for each case reducer function
export const { getLoginAndLogOut ,getLogOut} = loginSlice.actions;