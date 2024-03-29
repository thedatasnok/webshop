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
import { AddressDto, OrderLineDetails } from '@webshop/contracts';
import { OrderConfirmationProps } from './api/endpoints/orderConfirmation';
import environment from './api/env';

// this is a copy of the utility function in the ui package, importing it doesn't work here
// because `window` is undefined
export const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

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

  const preview = `Order confirmation ORD#${order.id
    .toString()
    .padStart(4, '0')}`;

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

      <Preview>{preview}</Preview>

      <Tailwind>
        <Body className='rounded-md bg-black font-sans text-zinc-50'>
          <Container className='mt-8'>
            <Img
              src='https://cgg-webshop-assets.s3.eu-north-1.amazonaws.com/images/branding/logo-big.png'
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
                <Address header='Billing address' {...order.billingAddress} />
              </Column>
              <Column>
                <Address header='Delivery address' {...order.deliveryAddress} />
              </Column>
            </Section>

            <Section className='w-1/2'>
              {order.lines.map((line) => (
                <Row className='py-1' key={line.id}>
                  <Link
                    href={`https://${environment.hostname}/products/${line.productId}`}
                  >
                    <Column className='w-24'>
                      <Img
                        src={line.productImageUrls[0]}
                        className='aspect-square w-24 rounded-sm'
                      />
                    </Column>
                    <Column className='pl-4'>
                      <Text className='text-lg font-bold uppercase'>
                        {line.productName}
                      </Text>
                      <Text className=''>{line.productShortDescription}</Text>
                    </Column>
                    <Column align='right'>
                      <Text>
                        <span className='mr-6'>
                          {line.quantity}&nbsp;&times;&nbsp;
                          {formatPrice(line.unitPrice)}
                        </span>
                      </Text>
                    </Column>
                    <Column align='right'>
                      <Text>
                        {formatPrice(line.subtotal)}
                        <br />
                        {line.wasDiscount && (
                          <>
                            <span className='text-sm font-semibold'>
                              Discount:
                            </span>{' '}
                            {formatPrice(getSavings(line))}
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
                    <span className='font-semibold'>Total:</span>{' '}
                    {formatPrice(order.total)}
                  </Text>
                  {totalSaved > 0 && (
                    <Text>
                      <span className='font-semibold'>Discount:</span>
                      {formatPrice(totalSaved)}
                    </Text>
                  )}
                </Column>
              </Row>
            </Section>

            <Section align='center'>
              <Column align='center'>
                <Button
                  className='mb-4 font-semibold text-zinc-300'
                  href={`https://${environment.hostname}/profile`}
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
