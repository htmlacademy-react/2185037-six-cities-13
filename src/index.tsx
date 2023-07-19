import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { Setting } from './config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={Setting.PlacesCount} />
  </React.StrictMode>
);
