import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './reducers/Login'

export const store = configureStore({
  reducer: {
    login:loginSlice.reducer
  },
})