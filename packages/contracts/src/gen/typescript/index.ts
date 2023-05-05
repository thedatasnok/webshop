/* tslint:disable */
/* eslint-disable */

export interface GenericResponse {
    message: string;
}

export interface ValidationError {
    message: string;
    rejectedValue: any;
}

export interface ValidationErrorResponse {
    statusCode: number;
    code: string;
    errors: { [index: string]: ValidationError[] };
}

export interface AddressDto {
    country: string;
    postalCode: string;
    city: string;
    street: string;
    careOf: string | null;
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
    iconUrl: string;
}

export interface CreateCategoryRequest {
    name: string;
    iconUrl: string;
}

export interface CreateItemRequest {
    name: string;
    description: string;
    priceGuidance: number;
    /**
     * The ID of the family the item should belong to, or null if it should not belong to a family.
     */
    familyId: number;
    /**
     * A list of category IDs that this item belongs to.
     */
    categories: number[];
    /**
     * A map of attributes for that item, typically specifications.
     */
    attributes: { [index: string]: string };
}

export interface OrderDetails {
    id: number;
    customerName: string;
    customerEmail: string;
    orderedAt: Date;
    deliveryAddress: AddressDto;
    billingAddress: AddressDto;
    lines: OrderLineDetails[];
    total: number;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    shippingMethod: string;
}

export interface OrderLineDetails {
    id: number;
    productId: number;
    productName: string;
    productShortDescription: string;
    productImageUrls: string[];
    quantity: number;
    wasDiscount: boolean;
    previousUnitPrice: number | null;
    unitPrice: number;
    subtotal: number;
}

export interface OrderSummary {
    date: Date;
    numberOfSales: number;
    sumOfSales: number;
}

export interface PlaceOrderRequest {
    customerName: string;
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

export interface UpdateOrderRequest {
    orderStatus: string;
    paymentStatus: string;
}

export interface UpdateProductPriceRequest {
    isDiscount: boolean;
    price: number;
}

export interface CreateProductRequest {
    name: string;
    shortName: string | null;
    description: string;
    shortDescription: string | null;
    imageUrls: string[];
    price: number;
    isDiscount: boolean;
    familyId: number | null;
    categoryIds: number[];
    /**
     * The attributes of the product grouped by .
     */
    attributes: { [index: string]: { [index: string]: string } } | null;
    /**
     * The amount of children products keyed by the item id.
     */
    children: { [index: string]: number } | null;
}

export interface ProductChildDetails {
    id: number;
    quantity: number;
    name: string;
    description: string;
    attributes: { [index: string]: string };
}

export interface ProductDetails {
    id: number;
    name: string;
    shortDescription: string;
    description: string;
    imageUrls: string[];
    price: number;
    isDiscount: boolean;
    previousPrice: number | null;
    attributes: { [index: string]: { [index: string]: string } };
    children: ProductChildDetails[];
    variants: ProductVariant[];
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

export interface ProductVariant {
    id: number;
    shortName: string;
}

export interface CreateProductFamilyRequest {
    name: string;
    description: string;
    sharedAttributes: { [index: string]: { [index: string]: string } };
    attributeMap: { [index: string]: { [index: string]: string[] } };
}

export interface UpdateUserProfileRequest {
    email: string;
    fullName: string;
    password: string | null;
    passwordConfirmation: string | null;
}

export interface UserAccountListItem {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    role: string;
    createdAt: Date;
    orderCount: number;
}

export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    emailVerified: boolean;
    role: string;
    createdAt: Date;
}
