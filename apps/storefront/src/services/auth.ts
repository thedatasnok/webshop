import {
  SignUpRequest,
  SignUpResponse,
  SignInRequest,
  SignInResponse,
} from '@webshop/contracts';
import { webshopApi } from '.';

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
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useLazyRefreshAccessTokenQuery,
} = authApi;
