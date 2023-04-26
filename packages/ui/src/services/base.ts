import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CoreState } from '../store';

export const TAGS = ['Order', 'Product'] as const;

export type TagType = (typeof TAGS)[number];

export const webshopApi = createApi({
  reducerPath: 'webshopApi',
  tagTypes: TAGS,
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
