/* tslint:disable */
/* eslint-disable */

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

export interface ProductListItem {
    id: number;
    name: string;
    imageUrls: string[];
    price: number;
    isDiscount: boolean;
}
