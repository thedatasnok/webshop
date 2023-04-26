import { authApi } from '../services/auth';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import jwtDecode, { type JwtPayload } from 'jwt-decode';
import { userContextApi } from '../services';

const ACCESS_TOKEN_KEY = 'accessToken';

/**
 * Reads the access token from local storage.
 *
 * @returns the access token, or null if it doesn't exist
 */
const readAccessToken = () => {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Basic details of a JWT token with a tad more explicit naming.
 */
export interface TokenDetails {
  issuer: string;
  expiresAt: number;
  issuedAt: number;
}

/**
 * A representation of the claims we have in JWT tokens.
 * These need to be updated whenever the backend contract changes.
 */
interface WebshopPayload {
  role: string;
  username: string;
  fullName: string;
}

/**
 * An intersection type of the token details and the webshop payload, representing the full details of JWT tokens used.
 */
export type WebshopToken = TokenDetails & WebshopPayload;

/**
 * State for the auth slice.
 */
export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  tokenDetails: WebshopToken | null;
}

/**
 * Decodes a JWT token and returns the token details.
 *
 * @param token the token to decode
 *
 * @returns the token details
 */
const destructureToken = (token: string): WebshopToken => {
  const { iss, exp, iat, role, username, fullName } = jwtDecode<
    WebshopPayload & JwtPayload
  >(token);

  return {
    issuer: iss!,
    expiresAt: exp!,
    issuedAt: iat!,
    role,
    username,
    fullName,
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

const initialState: AuthState = {
  isLoggedIn: !initialLoginState,
  accessToken: initialAccessToken,
  tokenDetails: initialTokenDetails,
};

/**
 * Slice for managing authentication.
 * This slice is responsible for storing the access token and token details.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
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
     * Whenver sign up requests are fulfilled, we set the credentials in the store.
     */
    builder.addMatcher(
      authApi.endpoints.signUp.matchFulfilled,
      (state, action) => {
        authSlice.caseReducers.setCredentials(state, {
          ...action,
          payload: action.payload.accessToken,
        });
      }
    );

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

    /**
     * Whenever the user is deleted from the backend, we clear the credentials.
     */
    builder.addMatcher(
      userContextApi.endpoints.deleteUserProfile.matchFulfilled,
      (state) => authSlice.caseReducers.clearCredentials(state)
    );
  },
});
