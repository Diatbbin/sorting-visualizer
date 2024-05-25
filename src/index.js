import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SortingVisualizer from './utils/SortingVisualizer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <body class="flex h-screen bg-gray-100">
      <SortingVisualizer/>
    </body>
   
  </React.StrictMode>
);
