import { authApi } from '@/services/auth';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import jwtDecode, { type JwtPayload } from 'jwt-decode';
import { RootState } from '.';

const ACCESS_TOKEN_KEY = 'accessToken';

/**
 * Reads the access token from local storage.
 *
 * @returns the access token, or null if it doesn't exist
 */
const readAccessToken = () => {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
};

export interface TokenDetails {
  issuer: string;
  expiresAt: number;
  issuedAt: number;
}

/**
 * State for the auth slice.
 */
export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  tokenDetails: TokenDetails | null;
}

/**
 * Decodes a JWT token and returns the token details.
 *
 * @param token the token to decode
 *
 * @returns the token details
 */
const destructureToken = (token: string): TokenDetails => {
  const { iss, exp, iat } = jwtDecode<JwtPayload>(token);

  return {
    issuer: iss!,
    expiresAt: exp!,
    issuedAt: iat!,
  };
};

/**
 * Checks whether or not a token is expired.
 *
 * @param tokenDetails the details of the token to check
 *
 * @returns true if the token is expired, false otherwise
 */
export const isTokenExpired = (tokenDetails: TokenDetails | null) => {
  if (!tokenDetails) return true;

  // the token is expired if the current time is greater than the expiry time
  // need to divide by 1000 as the expiredAt is in seconds, not milliseconds.
  return tokenDetails.expiresAt < Date.now() / 1000;
};

const initialAccessToken = readAccessToken();
const initialTokenDetails = initialAccessToken
  ? destructureToken(initialAccessToken)
  : null;
const initialLoginState = isTokenExpired(initialTokenDetails);

/**
 * Slice for managing authentication.
 * This slice is responsible for storing the access token and token details.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !initialLoginState,
    accessToken: initialAccessToken,
    tokenDetails: initialTokenDetails,
  } as AuthState,
  reducers: {
    /**
     * Action to set the credentials in the store.
     *
     * @param state the current state of the store slice
     * @param action the payload of the action
     */
    setCredentials: (state, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
      state.tokenDetails = destructureToken(payload);
      state.isLoggedIn = true;

      window.localStorage.setItem(ACCESS_TOKEN_KEY, payload);
    },

    /**
     * Action to clear the credentials from the store, and remove the access token from local storage.
     *
     * @param state the current state of the store slice
     */
    clearCredentials: (state) => {
      state.accessToken = null;
      state.tokenDetails = null;
      state.isLoggedIn = false;

      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    /**
     * Whenver sign in requests are fulfilled, we set the credentials in the store.
     */
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, action) => {
        authSlice.caseReducers.setCredentials(state, {
          ...action,
          payload: action.payload.accessToken,
        });
      }
    );

    /**
     * Whenever the access token is refreshed, we set the credentials in the store.
     */
    builder.addMatcher(
      authApi.endpoints.refreshAccessToken.matchFulfilled,
      (state, action) => {
        authSlice.caseReducers.setCredentials(state, {
          ...action,
          payload: action.payload.accessToken,
        });
      }
    );

    /**
     * Whenever refreshing the access token fails, we assume it is expired and clear the credentials.
     * Should result in the user having to log back in if they are on a protected page.
     */
    builder.addMatcher(
      authApi.endpoints.refreshAccessToken.matchRejected,
      (state, action) => {
        // if the status code is 400, we assume the token is expired
        // other status codes are unexpected.
        if (action.payload?.status === 400) {
          authSlice.caseReducers.clearCredentials(state);
        }
      }
    );

    /**
     * Whenever the user signs out, we clear the credentials.
     * This will result in the user being redirected to the login page, if they are on a protected page.
     */
    builder.addMatcher(authApi.endpoints.signOut.matchFulfilled, (state) =>
      authSlice.caseReducers.clearCredentials(state)
    );
  },
});

export const selectAuth = (state: RootState) => state.auth;
