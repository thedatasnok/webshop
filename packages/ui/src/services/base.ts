import { CoreState } from '../store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const webshopApi = createApi({
  reducerPath: 'webshopApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, api) => {
      const { accessToken } = (api.getState() as CoreState).auth;

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (_builder) => ({}),
});
