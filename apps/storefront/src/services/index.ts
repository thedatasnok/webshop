import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const webshopApi = createApi({
  reducerPath: 'webshopApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({}),
});
