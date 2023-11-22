import React from 'react';
import ReactDOM from 'react-dom/client';
/**
 * This file can be ignored, please work in ./components/App.tsx
 */

// Include mock API.
import './mock';

// Include global styles.
import './styles/index.css';

// Include App component.
import App from './components/App';

// Include React Router.
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);


