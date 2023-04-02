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

// TODO: Get rid of this whenever we wire up a proper way of getting the order from the backend
const SAMPLE_ORDER: OrderDetails = {
  id: 25,
  customerName: 'Kalle Lindgren',
  orderedAt: new Date('2023-04-01T18:13:44.159+00:00'),
  deliveryAddress: {
    country: 'Norway',
    postalCode: '6002',
    city: 'Ålesund',
    street: 'Larsgårdsvegen 2',
    careOf: null,
  },
  billingAddress: {
    country: 'Norway',
    postalCode: '6002',
    city: 'Ålesund',
    street: 'Larsgårdsvegen 2',
    careOf: null,
  },
  lines: [
    {
      id: 45,
      productId: 1,
      productName: 'Xbox Pack',
      productShortDescription: 'En episk',
      productImageUrls: [],
      quantity: 2,
      wasDiscount: false,
      previousUnitPrice: 4230.0,
      unitPrice: 6820.0,
      subtotal: 13640.0,
    },
    {
      id: 46,
      productId: 36,
      productName: 'Mouse',
      productShortDescription: 'Gaming mouse',
      productImageUrls: [
        'https://media.discordapp.net/attachments/1073313153137516626/1073357874132156548/00044-1602128532-masterpiece_best_quality_a_3d_render_of_a_futuristic_gaming_mouse_with_haptic_feedback_and_terrain_generation.png',
      ],
      quantity: 1,
      wasDiscount: false,
      previousUnitPrice: null,
      unitPrice: 300.0,
      subtotal: 300.0,
    },
  ],
  total: 13940.0,
  status: 'NEW',
  paymentStatus: 'NEW',
  paymentMethod: 'SMART_CONTRACT',
  shippingMethod: 'DRONE',
};

interface OrderConfirmationProps {
  order: OrderDetails;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order = SAMPLE_ORDER,
}) => {
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
                <Row className='py-1'>
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

export default OrderConfirmation;
