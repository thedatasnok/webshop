/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.1.1185 on 2023-02-07 12:16:40.

export interface GenericResponse {
    message: string;
}

export interface SignUpRequest {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface SignUpResponse {
    id: string;
    username: string;
    email: string;
}
