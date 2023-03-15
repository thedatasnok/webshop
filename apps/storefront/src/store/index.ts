import { webshopApi } from '@/services';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth.slice';
import { cartSlice } from './cart.slice';

export const store = configureStore({
  reducer: {
    [webshopApi.reducerPath]: webshopApi.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webshopApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
