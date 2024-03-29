import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@webshop/contracts';
import { webshopApi } from './base';

export const authApi = webshopApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Signs up a user.
     */
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (body) => ({
        url: '/v1/auth/sign-up',
        method: 'POST',
        body,
      }),
    }),

    /**
     * Signs in a user.
     */
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (body) => ({
        url: '/v1/auth/sign-in',
        method: 'POST',
        body,
      }),
    }),

    /**
     * Refreshes the access token.
     */
    refreshAccessToken: builder.query<SignInResponse, void>({
      query: () => '/v1/auth/refresh',
    }),

    /**
     * Signs out the user.
     */
    signOut: builder.mutation<string, void>({
      query: () => ({
        url: '/v1/auth/sign-out',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useLazyRefreshAccessTokenQuery,
  useSignOutMutation,
} = authApi;
