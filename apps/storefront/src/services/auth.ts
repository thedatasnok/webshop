import { SignUpRequest, SignUpResponse, SignInRequest, SignInResponse } from '@webshop/contracts';
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

    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({
        url: '/v1/auth/sign-in',
        method: 'POST',
        body,
      }),
    })

  }),
});

export const { useSignUpMutation } = authApi;
export const { useSignInMutation } = authApi;
