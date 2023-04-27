import { z } from 'zod';
import OrderConfirmation from '../../OrderConfirmation';
import { defineMailEndpoint, genericMailSchema } from '../lib';

const addressSchema = z.object({
  country: z.string(),
  city: z.string(),
  postalCode: z.string(),
  street: z.string(),
  careOf: z.string().nullable(),
});

const orderLineSchema = z.object({
  id: z.number(),
  productId: z.number(),
  productName: z.string(),
  productShortDescription: z.string(),
  productImageUrls: z.array(z.string()),
  quantity: z.number(),
  wasDiscount: z.boolean(),
  previousUnitPrice: z.number().nullable(),
  unitPrice: z.number(),
  subtotal: z.number(),
});

const propsSchema = genericMailSchema.extend({
  order: z.object({
    id: z.number(),
    customerName: z.string(),
    orderedAt: z.string(),
    deliveryAddress: addressSchema,
    billingAddress: addressSchema,
    lines: z.array(orderLineSchema),
    total: z.number(),
    status: z.string(),
    paymentStatus: z.string(),
    paymentMethod: z.string(),
    shippingMethod: z.string(),
  }),
});

export type OrderConfirmationProps = z.infer<typeof propsSchema>;

export default defineMailEndpoint({
  url: '/mails/order-confirmation',
  validator: propsSchema,
  subject: ({ order }) =>
    `Order confirmation ORD#${order.id.toString().padStart(4, '0')}`,
  render: OrderConfirmation,
});
