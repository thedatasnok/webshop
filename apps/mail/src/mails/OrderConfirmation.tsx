import {
  GenericMailOptions,
  defineMailEndpoint,
  genericMailSchema,
} from '@/lib';
import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { AddressDto, OrderDetails, OrderLineDetails } from '@webshop/contracts';
import { z } from 'zod';

interface OrderConfirmationProps extends GenericMailOptions {
  order: OrderDetails;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order }) => {
  const getSavings = (line: OrderLineDetails) => {
    if (line.wasDiscount && line.previousUnitPrice) {
      return (line.previousUnitPrice - line.unitPrice) * line.quantity;
    }

    return 0;
  };

  const totalSaved = order.lines.reduce(
    (acc, line) =>
      line.wasDiscount && line.previousUnitPrice ? acc + getSavings(line) : acc,
    0
  );

  return (
    <Html>
      <Head>
        <Font
          fontFamily='Roboto Condensed'
          fallbackFontFamily='Verdana'
          webFont={{
            url: 'https://fonts.gstatic.com/s/robotocondensed/v25/ieVl2ZhZI2eCN5jzbjEETS9weq8-19K7DQ.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>

      <Preview>Order confirmation ORD#00033</Preview>

      <Tailwind>
        <Body className='rounded-md bg-black font-sans text-zinc-50'>
          <Container className='mt-8'>
            <Img
              src='https://github.com/thedatasnok/webshop/raw/main/docs/assets/logo-big.svg'
              className='mx-auto w-1/2'
            />

            <Heading as='h1' className='text-center text-2xl'>
              Thanks for placing your order!
            </Heading>

            <Text className='text-center'>
              Your order has been successfully placed, and we appreciate doing
              business with you.
              <br />
              <span className='font-semibold'>
                Don't expect to receive whatever you decided to order though.
              </span>
            </Text>

            <Section className='mx-auto w-3/4'>
              <Column>
                <Address header='Delivery address' {...order.deliveryAddress} />
              </Column>
              <Column>
                <Address header='Invoice address' {...order.deliveryAddress} />
              </Column>
            </Section>

            <Section className='w-1/2'>
              {order.lines.map((line) => (
                <Row className='py-1' key={line.id}>
                  <Link href='https://google.com'>
                    <Column className='w-24'>
                      <Img
                        src={line.productImageUrls[0]}
                        className='aspect-square w-24 rounded-sm'
                      />
                    </Column>
                    <Column className='pl-4'>
                      <Text className='text-lg font-bold uppercase'>
                        {line.quantity}x {line.productName}
                      </Text>
                      <Text className=''>{line.productShortDescription}</Text>
                    </Column>
                    <Column align='right'>
                      <Text>
                        ${line.subtotal}
                        <br />
                        {line.wasDiscount && (
                          <>
                            <span className='text-sm font-semibold'>
                              Discount:
                            </span>{' '}
                            ${getSavings(line)}
                          </>
                        )}
                      </Text>
                    </Column>
                  </Link>
                </Row>
              ))}

              <Hr className='border-zinc-600' />

              <Row>
                <Column align='right'>
                  <Text>
                    <span className='font-semibold'>Total:</span> ${order.total}
                  </Text>
                  {totalSaved > 0 && (
                    <Text>
                      <span className='font-semibold'>Discount:</span> $
                      {totalSaved}
                    </Text>
                  )}
                </Column>
              </Row>
            </Section>

            <Section align='center'>
              <Column align='center'>
                <Button
                  className='mb-4 font-semibold text-zinc-300'
                  href='https://google.com'
                >
                  View your order status online
                </Button>
              </Column>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

interface AddressProps extends AddressDto {
  header: string;
}

const Address: React.FC<AddressProps> = ({
  header,
  country,
  city,
  postalCode,
  street,
  careOf,
}) => {
  return (
    <>
      <Heading as='h3' className='mb-0 text-base font-semibold'>
        {header}
      </Heading>
      <Text className='mt-0 text-zinc-300'>
        {country}
        <br />
        {postalCode}, {city}
        <br />
        {street}
        <br />
        {careOf}
      </Text>
    </>
  );
};

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

export default defineMailEndpoint({
  url: '/mails/order-confirmation',
  validator: propsSchema,
  subject: ({ order }) => `Order confirmation ORD#${order.id}`,
  render: OrderConfirmation as any, // TODO: find a way to type this properly
});
