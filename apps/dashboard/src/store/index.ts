import { configureStore } from '@reduxjs/toolkit';
import { coreReducers, webshopApi } from '@webshop/ui';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    ...coreReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(webshopApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
