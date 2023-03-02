import { SignUpRequest, SignUpResponse } from '@webshop/contracts';
import { webshopApi } from '.';

export const authApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (body) => ({
        url: '/v1/auth/sign-up',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation } = authApi;
