/* tslint:disable */
/* eslint-disable */

export interface GenericResponse {
    message: string;
}

export interface AddressDto {
    country: string;
    postalCode: string;
    city: string;
    street: string;
    careOf: string;
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

export interface CategoryDto {
    id: number;
    name: string;
}

export interface PlaceOrderRequest {
    shippingAddress: AddressDto;
    billingAddress: AddressDto;
    differentBillingAddress: boolean;
    paymentMethod: string;
    shippingMethod: string;
    /**
     * The quantity of products keyed by the product id.
     */
    lines: { [index: string]: number };
}

export interface UpdateProductPriceRequest {
    isDiscount: boolean;
    price: number;
}

export interface CreateProductRequest {
    name: string;
    description: string;
    imageUrls: string[];
    price: number;
    isDiscount: boolean;
    /**
     * The amount of items keyed by the item id.
     */
    items: { [index: string]: number };
}

export interface ProductDetails {
    id: number;
    name: string;
    description: string;
    imageUrls: string[];
    price: number;
    isDiscount: boolean;
    previousPrice: number;
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
    shortDescription: string;
    imageUrls: string[];
    price: number;
    isDiscount: boolean;
    previousPrice: number;
}

export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    emailVerified: boolean;
    role: string;
    createdAt: Date;
}
