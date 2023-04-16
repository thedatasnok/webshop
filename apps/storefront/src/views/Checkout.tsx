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
  TextField,
  formatPrice,
  useAuth,
} from '@webshop/ui';
import {
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
      await placeOrder(values).unwrap();
      dispatch(clearCart());
      navigate(RouteHref.ORDER_CONFIRMATION);
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

  function handleDifferentBillingAddress(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const checked = e.target.checked;
    form.setFieldValue('differentBillingAddress', checked);
  }

  return (
    <div>
      <header className='mx-auto flex flex-col items-center justify-center py-10'>
        <NavLink
          to={RouteHref.HOME}
          className='flex-wrap items-center justify-center'
        >
          <div className='w-32'>
            <Logo variant='small' />
          </div>
        </NavLink>
      </header>

      <main>
        <div className='mx-auto grid max-w-screen-xl gap-0 px-2 lg:grid-cols-2 lg:gap-8'>
          <form
            id='check-out-form'
            className='flex w-full flex-col gap-2'
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <div className='flex flex-col rounded-sm'>
              <p className='text-xl'>Delivery information</p>
              <hr className='text-base-600 pb-4' />
              <div className='flex w-full flex-col gap-1'>
                <div>
                  <InputLabel>Name</InputLabel>
                  <TextField {...form.getInputProps('customerName')} />
                </div>

                <div>
                  <InputLabel>Country</InputLabel>
                  <TextField
                    {...form.getInputProps('shippingAddress.country')}
                  />
                </div>

                <div>
                  <InputLabel>City</InputLabel>
                  <TextField {...form.getInputProps('shippingAddress.city')} />
                </div>

                <div>
                  <InputLabel>Street</InputLabel>
                  <TextField
                    {...form.getInputProps('shippingAddress.street')}
                  />
                </div>

                <div>
                  <InputLabel>Postal Code</InputLabel>
                  <TextField
                    {...form.getInputProps('shippingAddress.postalCode')}
                  />
                </div>

                <div>
                  <InputLabel>C/O Address (optional)</InputLabel>
                  <TextField
                    {...form.getInputProps('shippingAddress.careOf')}
                  />
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <input
                id='different-billing-address'
                type='checkbox'
                className='border-base-600 bg-base-600'
                onChange={handleDifferentBillingAddress}
              />
 
              <InputLabel htmlFor='different-billing-address'>
                Different billing address
              </InputLabel>
            </div>

            {form.values.differentBillingAddress && (
              <div>
                <h1 className='font-title text-3xl'>Billing address</h1>

                <div>
                  <InputLabel>Country</InputLabel>
                  <TextField
                    {...form.getInputProps('billingAddress.country')}
                  />
                </div>

                <div>
                  <InputLabel>City</InputLabel>
                  <TextField {...form.getInputProps('billingAddress.city')} />
                </div>

                <div>
                  <InputLabel>Street</InputLabel>
                  <TextField {...form.getInputProps('billingAddress.street')} />
                </div>

                <div>
                  <InputLabel>Postal Code</InputLabel>
                  <TextField
                    {...form.getInputProps('billingAddress.postalCode')}
                  />
                </div>

                <div>
                  <InputLabel>C/O Address (optional)</InputLabel>
                  <TextField {...form.getInputProps('billingAddress.careOf')} />
                </div>
              </div>
            )}
            <div className='mt-2'>
              <h2 className='font-title text-lg font-semibold uppercase'>
                Shipping method
              </h2>

              <RadioGroup
                value={form.values.shippingMethod}
                onChange={(shippingMethod) =>
                  form.setValues({ shippingMethod })
                }
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
                    description:
                      'Let one of our drones fly your gear in no time.',
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
            </div>

            <div className='mt-2 pb-8'>
              <h2 className='font-title text-lg font-semibold uppercase'>
                Payment method
              </h2>

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
            </div>

            <div className='flex flex-col pb-8 lg:items-center lg:justify-end'>
              <div>
                <Button
                  className='font-title w-full rounded-sm text-2xl font-semibold uppercase'
                  type='submit'
                >
                  {/* default value to 0 if products are not loaded  */}
                  Pay: {formatPrice(totalPrice || 0)}
                </Button>
              </div>
            </div>
          </form>

          <div className='h-max lg:flex lg:flex-col-reverse'>
            <div>
              <p className='text-xl text-gray-400'>Shopping cart</p>
              <hr className='text-base-600 pb-2'></hr>
              <div>
                {products?.map((product, i) => (
                  <ProductListCard
                    key={product.id}
                    to={'/products/' + product.id}
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

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
    <div className='flex flex-row items-end justify-end gap-4 sm:gap-8'>
      <span className='bg-base-800/40 font-title flex whitespace-nowrap rounded-sm px-1 text-xl'>
        qty: {quantity}
      </span>
      <div className='flex flex-col items-end gap-1'>
        <h3 className='flex w-16 items-end justify-end text-xl'>
          {formatPrice(totalPrice)}
        </h3>
        {isDiscount && (
          <div className='bg-secondary/30 border-secondary text-secondary-50 w-fit whitespace-nowrap rounded-sm border px-1 text-xs'>
            -{formatPrice(previousTotal - totalPrice)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
