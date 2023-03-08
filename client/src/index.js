import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CustomerContextProvider } from './context/CustomerContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <CustomerContextProvider>
      <App />
    </CustomerContextProvider>
    
  </React.StrictMode>
);

