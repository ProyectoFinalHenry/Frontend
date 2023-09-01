import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios'; 
import App from './App';
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/store';

// Configura la URL base
//axios.defaults.baseURL = 'http://localhost:3001/';
axios.defaults.baseURL = import.meta.env.VITE_API;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
