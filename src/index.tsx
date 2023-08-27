import * as ReactDOM from 'react-dom/client';
import './index.css';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
