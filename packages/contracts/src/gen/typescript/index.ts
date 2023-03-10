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

export interface Category {
    id: number;
    name: string;
}

export interface CreateProductRequest {
    name: string;
    description: string;
    imageUrls: string[];
    price: number;
    isDiscount: boolean;
    items: { [index: string]: number };
}

export interface ProductDetails {
    id: number;
    name: string;
    description: string;
    imageUrls: string[];
    price: number;
    isDiscount: boolean;
    items: ProductItemDetails[];
}

export interface ProductItemDetails {
    id: number;
    quantity: number;
    name: string;
    description: string;
    attributes: { [index: string]: string };
}

export interface ProductListItem {
    id: number;
    name: string;
    imageUrls: string[];
    price: number;
    isDiscount: boolean;
}

export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    emailVerified: boolean;
    role: string;
    createdAt: Date;
}
