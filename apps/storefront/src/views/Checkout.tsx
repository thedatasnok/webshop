import ProductListCard from '@/components/product/ProductListCard';
import { useCart } from '@/hooks/useCart';
import { RouteHref } from '@/router';
import { useFindProductsQuery } from '@/services/products';
import { usePlaceOrderMutation } from '@/services/userContextOrders';
import { clearCart } from '@/store/cart.slice';
import { useForm, zodResolver } from '@mantine/form';
import { PlaceOrderRequest } from '@webshop/contracts';
import {
  Button,
  InputLabel,
  Logo,
  PaymentMethod,
  RadioGroup,
  ShippingMethod,
  Switch,
  TextField,
  formatPrice,
  useAuth,
} from '@webshop/ui';
import clsx from 'clsx';
import {
  RiArrowLeftSLine,
  RiBitCoinLine,
  RiClipboardLine,
  RiFingerprintLine,
  RiMagicLine,
  RiTruckLine,
  RiWalletLine,
} from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  customerName: z.string().nonempty(),
  shippingAddress: z.object({
    country: z
      .string()
      .min(2, { message: 'Name should have at least 2 letters' }),
    city: z.string().min(2),
    street: z.string().min(2),
    postalCode: z.string().min(2),
    careOf: z.string().optional(),
  }),
  billingAddress: z.object({
    country: z.string(),
    postalCode: z.string(),
    city: z.string(),
    street: z.string(),
  }),
  differentBillingAddress: z.boolean(),
  shippingMethod: z.string(),
  paymentMethod: z.string(),
});

const Checkout = () => {
  const { tokenDetails } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const { data: products } = useFindProductsQuery({
    id: Object.keys(items).map((id) => parseInt(id)),
    allowEmptyIdList: false,
  });

  const [placeOrder] = usePlaceOrderMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (values: PlaceOrderRequest) => {
    try {
      const orderId = await placeOrder(values).unwrap();
      dispatch(clearCart());
      navigate([RouteHref.ORDER_CONFIRMATION, orderId].join('/'));
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Iterates over products and calculates the total price
   */
  const totalPrice = products?.reduce((total, product) => {
    return total + items[product.id] * product.price;
  }, 0);

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      customerName: tokenDetails?.fullName ?? '',
      shippingAddress: {
        country: '',
        postalCode: '',
        city: '',
        street: '',
        careOf: '',
      },

      billingAddress: {
        country: '',
        postalCode: '',
        city: '',
        street: '',
        careOf: '',
      },
      differentBillingAddress: false,
      paymentMethod: '',
      shippingMethod: '',
      lines: items,
    },
  });

  return (
    <>
      <header className='mx-auto flex flex-col items-center justify-center py-10'>
        <NavLink
          to={RouteHref.HOME}
          className='flex-wrap items-center justify-center'
        >
          <span className='sr-only'>CGG Home</span>
          <div className='w-32'>
            <Logo variant='small' />
          </div>
        </NavLink>
      </header>

      <div className='mx-auto max-w-screen-xl pl-1'>
        <NavLink
          className='font-title text-base-400 hover:text-base-300 flex w-fit items-center text-sm font-semibold uppercase transition-colors hover:underline'
          to={RouteHref.CART}
        >
          <RiArrowLeftSLine className='h-5 w-5' />
          <span>Back to shopping cart</span>
        </NavLink>
      </div>

      <main className='mx-auto grid max-w-screen-xl gap-0 px-2 pb-4 lg:grid-cols-2 lg:gap-8'>
        <form
          id='check-out-form'
          className='flex w-full flex-col gap-1'
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <SectionHeader title='Delivery address' />

          <div>
            <InputLabel htmlFor='customer-name'>Name</InputLabel>
            <TextField
              id='customer-name'
              {...form.getInputProps('customerName')}
            />
          </div>

          <div>
            <InputLabel htmlFor='shipping-country'>Country</InputLabel>
            <TextField
              id='shipping-country'
              {...form.getInputProps('shippingAddress.country')}
            />
          </div>
          <div>
            <InputLabel htmlFor='shipping-city'>City</InputLabel>
            <TextField
              id='shipping-city'
              {...form.getInputProps('shippingAddress.city')}
            />
          </div>
          <div>
            <InputLabel htmlFor='shipping-street'>Street</InputLabel>
            <TextField
              id='shipping-street'
              {...form.getInputProps('shippingAddress.street')}
            />
          </div>

          <div>
            <InputLabel htmlFor='shipping-postal-code'>Postal Code</InputLabel>
            <TextField
              id='shipping-postal-code'
              {...form.getInputProps('shippingAddress.postalCode')}
            />
          </div>

          <div>
            <InputLabel htmlFor='shipping-co'>
              C/O Address (optional)
            </InputLabel>
            <TextField
              id='shipping-co'
              {...form.getInputProps('shippingAddress.careOf')}
            />
          </div>

          <div className='flex items-center gap-2'>
            <Switch
              id='different-billing-address'
              checked={form.values.differentBillingAddress}
              ariaLabel='Different billing address'
              onChange={(value) =>
                form.setFieldValue('differentBillingAddress', value)
              }
            />

            <InputLabel htmlFor='different-billing-address'>
              Different billing address
            </InputLabel>
          </div>

          {form.values.differentBillingAddress && (
            <>
              <SectionHeader title='Billing address' className='mt-2' />

              <div>
                <InputLabel htmlFor='billing-country'>Country</InputLabel>
                <TextField
                  id='billing-country'
                  {...form.getInputProps('billingAddress.country')}
                />
              </div>

              <div>
                <InputLabel htmlFor='billing-city'>City</InputLabel>
                <TextField
                  id='billing-city'
                  {...form.getInputProps('billingAddress.city')}
                />
              </div>

              <div>
                <InputLabel htmlFor='billing-street'>Street</InputLabel>
                <TextField
                  id='billing-street'
                  {...form.getInputProps('billingAddress.street')}
                />
              </div>

              <div>
                <InputLabel htmlFor='billing-postal-code'>
                  Postal Code
                </InputLabel>
                <TextField
                  id='billing-postal-code'
                  {...form.getInputProps('billingAddress.postalCode')}
                />
              </div>

              <div>
                <InputLabel htmlFor='billing-co'>
                  C/O Address (optional)
                </InputLabel>
                <TextField
                  id='billing-co'
                  {...form.getInputProps('billingAddress.careOf')}
                />
              </div>
            </>
          )}

          <SectionHeader title='Shipping method' className='mt-2 text-xl' />

          <RadioGroup
            value={form.values.shippingMethod}
            onChange={(shippingMethod) => form.setValues({ shippingMethod })}
            options={[
              {
                name: 'Instant teleportation',
                description:
                  'Have your gaming gear instantly appear in your home.',
                value: ShippingMethod.INSTANT_TELEPORTATION,
                icon: RiMagicLine,
              },
              {
                name: 'Drone',
                description: 'Let one of our drones fly your gear in no time.',
                value: ShippingMethod.DRONE,
                icon: RiTruckLine,
              },
              {
                name: 'Self-driving truck',
                description:
                  'One of our self-driving trucks will drop off your gear',
                value: ShippingMethod.SELF_DRIVING_TRUCK,
                icon: RiTruckLine,
              },
              {
                name: 'Hyperloop',
                description: 'Your gear packaged in a vacuum-sealed pod',
                value: ShippingMethod.HYPERLOOP,
                icon: RiTruckLine,
              },
            ]}
          />

          <SectionHeader title='Payment method' className='mt-2 text-xl' />

          <RadioGroup
            value={form.values.paymentMethod}
            onChange={(paymentMethod) => form.setValues({ paymentMethod })}
            options={[
              {
                name: 'Biometric',
                description: 'Pay using your fingerprint or face scan',
                value: PaymentMethod.BIOMETRIC,
                icon: RiFingerprintLine,
              },
              {
                name: 'Crypto',
                description: 'Pay with your cryptocurrency of choice',
                value: PaymentMethod.CRYPTO,
                icon: RiBitCoinLine,
              },
              {
                name: 'Virtual wallet',
                description: 'Pay with your favorite virtual wallet.',
                value: PaymentMethod.VIRTUAL_WALLET,
                icon: RiWalletLine,
              },
              {
                name: 'Smart contract',
                description: 'Sign a smart contract to pay for your order',
                value: PaymentMethod.SMART_CONTRACT,
                icon: RiClipboardLine,
              },
            ]}
          />

          <Button
            className='mt-2 w-fit self-center text-lg font-semibold'
            type='submit'
          >
            {/* default value to 0 if products are not loaded  */}
            Pay {formatPrice(totalPrice ?? 0)}
          </Button>
        </form>

        <div className='h-max pt-4 sm:pt-0 lg:flex lg:flex-col'>
          <SectionHeader title='Shopping cart' />

          <ul className='divide-y'>
            {products?.map((product) => (
              <ProductListCard
                key={product.id}
                to={'/products/' + product.id}
                id={product.id}
                name={product.name}
                shortDescription={product.shortDescription}
                image={product.imageUrls[0]}
              >
                <ProductListCardCartActions
                  quantity={items[product.id]}
                  price={product.price}
                  previousPrice={product.previousPrice}
                  isDiscount={product.isDiscount}
                />
              </ProductListCard>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

const SectionHeader: React.FC<{ title: string; className?: string }> = ({
  title,
  className,
}) => (
  <div
    className={clsx('font-title text-2xl font-semibold uppercase', className)}
  >
    <h2>{title}</h2>
    <hr className='text-base-700' />
  </div>
);

interface CheckoutCardCartActionsProps {
  price: number;
  previousPrice: number;
  quantity: number;
  isDiscount: boolean;
}

const ProductListCardCartActions: React.FC<CheckoutCardCartActionsProps> = ({
  price,
  previousPrice,
  quantity,
  isDiscount,
}) => {
  const totalPrice = price * quantity;
  const previousTotal = previousPrice * quantity;

  return (
    <div className='flex flex-col justify-center'>
      <div className='flex items-center gap-4 sm:gap-4'>
        <p className='font-title'>
          {quantity}&nbsp;&times;&nbsp;{formatPrice(price)}
        </p>

        <div className='font-title flex flex-col items-end font-semibold sm:min-w-[5rem]'>
          <div className='text-xl'>{formatPrice(totalPrice)}</div>
          {isDiscount && previousTotal !== 0 && (
            <div className='bg-secondary/30 border-secondary text-secondary-50 w-fit whitespace-nowrap rounded-sm border px-1 text-xs'>
              {formatPrice(totalPrice - previousTotal)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
