import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    LoginAndLogOut : false,
    TokenUser: '',
    NewinformationUser:{}
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
        },
        getTokenUser: (state , action) =>{
            state.TokenUser = action.payload
        },
        getInformationUser: (state , action) =>{
            state.NewinformationUser = action.payload
        },
        getDeleteToken:(state ) =>{
            state.TokenUser = ''
        }
    }
});



// Action creators are generated for each case reducer function
export const { getLoginAndLogOut ,getLogOut , getTokenUser , getInformationUser ,getDeleteToken} = loginSlice.actions;