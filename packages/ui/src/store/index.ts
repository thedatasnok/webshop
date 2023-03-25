import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { webshopApi } from '../services';
import { authSlice } from './auth.slice';

export * from './auth.slice';

export const coreReducers = {
  [webshopApi.reducerPath]: webshopApi.reducer,
  auth: authSlice.reducer,
};

const coreStore = configureStore({
  reducer: coreReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webshopApi.middleware),
});

export type CoreState = ReturnType<typeof coreStore.getState>;
export type CoreDispatch = typeof coreStore.dispatch;
export const useCoreDispatch: () => CoreDispatch = useDispatch;
export const useCoreSelector: TypedUseSelectorHook<CoreState> = useSelector;
