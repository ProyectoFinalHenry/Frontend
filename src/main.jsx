import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import axios from 'axios'; 
import store from './redux/store';
import App from './App';
import './index.css'

// Configura la URL base
axios.defaults.baseURL = 'http://localhost:3001/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
