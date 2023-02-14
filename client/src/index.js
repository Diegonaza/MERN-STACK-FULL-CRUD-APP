import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CostumerContextProvider } from './context/CostumerContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <CostumerContextProvider>
      <App />
    </CostumerContextProvider>
    
  </React.StrictMode>
);

