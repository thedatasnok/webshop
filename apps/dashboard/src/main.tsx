import '@webshop/ui/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>
);
