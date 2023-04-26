import { UpdateUserProfileRequest } from '@webshop/contracts';
import { webshopApi } from './base';

export const userContextApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation<void, UpdateUserProfileRequest>({
      query: (body) => ({
        url: '/v1/me',
        method: 'PATCH',
        body,
      }),
    }),
    deleteUserProfile: builder.mutation<void, void>({
      query: () => ({
        url: '/v1/me',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useUpdateUserProfileMutation, useDeleteUserProfileMutation } =
  userContextApi;
