/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.1.1185 on 2023-03-05 13:08:37.

export interface GenericResponse {
    message: string;
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    accessToken: string;
}

export interface SignUpRequest {
    fullName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface SignUpResponse {
    id: string;
    fullName: string;
    email: string;
    accessToken: string;
}
