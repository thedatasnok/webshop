import router from '@/router';
import { store } from '@/store';
import '@webshop/ui/styles.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

dayjs.extend(relativeTime);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Suspense>
        <RouterProvider router={router} />
      </React.Suspense>
    </Provider>
  </React.StrictMode>
);
