import { createSlice } from '@reduxjs/toolkit';
import jwtDecode, { type JwtPayload } from 'jwt-decode';

const readAccessToken = () => {
  return window.localStorage.getItem('accessToken');
};

export interface TokenDetails {
  issuer: string;
  expiresAt: Date;
  issuedAt: Date;
}

const destructureToken = (token: string) => {
  const decodedToken = jwtDecode<JwtPayload>(token);

  console.log(decodedToken);
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    accessToken: readAccessToken(),
    tokenDetails: null,
  },
  reducers: {},
});
