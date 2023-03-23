import { RouteHref } from '@/router';
import {
  Button,
  Logo,
  PaymentMethod,
  RadioGroup,
  ShippingMethod,
  TextField,
} from '@webshop/ui';
import {
  RiBitCoinLine,
  RiClipboardLine,
  RiFingerprintLine,
  RiMagicLine,
  RiTruckLine,
  RiWalletLine,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const Checkout = () => {
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
        <div className='mx-auto grid max-w-screen-xl gap-8 px-2 lg:grid-cols-2'>
          <div>
            <form>
              <div className='flex flex-col rounded-sm'>
                <p className='text-xl'>Delivery information</p>
                <hr className='text-base-600 pb-4'></hr>
                <label className='block text-sm'>Full name</label>
                <div className='mb-2'>
                  <TextField
                    type='text'
                    className='w-full bg-transparent focus:outline-none'
                    placeholder='First Middle Last'
                  />
                </div>
                <label className='block text-sm'>Address</label>
                <div className='mb-2'>
                  <TextField
                    type='text'
                    className='w-full bg-transparent focus:outline-none'
                    placeholder='address'
                  />
                </div>
                <label className='block text-sm'>Country</label>
                <div className='mb-2'>
                  <TextField
                    type='text'
                    className='w-full bg-transparent focus:outline-none'
                    placeholder='country'
                  />
                </div>
                <label className='block text-sm'>Postal code</label>
                <div className='mb-2'>
                  <TextField
                    type='text'
                    className='w-full bg-transparent focus:outline-none'
                    placeholder='postal code'
                  />
                </div>
              </div>
              <div className='flex flex-row gap-4 py-4'>
                <input type='checkbox' />
                <p>same shipping address</p>
              </div>
            </form>

            <div className='mt-2'>
              <h2 className='font-title text-lg font-semibold uppercase'>
                Shipping methods
              </h2>

              <RadioGroup
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
                    name: 'Self-driven truck',
                    description:
                      'One of our self-driven trucks will drop off your gear',
                    value: ShippingMethod.SELF_DRIVEN_TRUCK,
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
                Payment methods
              </h2>

              <RadioGroup
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
          </div>

          <div className='h-max lg:flex lg:flex-col-reverse'>
            <div className='flex flex-col gap-4 lg:items-center lg:justify-end'>
              <Button className='mt-2 h-10 w-full px-6 font-semibold uppercase lg:w-fit'>
                Confirm & Buy
              </Button>

              <div className='flex items-center justify-end gap-4'>
                <p>Total</p>
                <p>$408.00</p>
              </div>
            </div>

            <div>
              <p className='text-xl text-gray-400'>Shopping cart</p>
              <hr className='text-base-600 pb-4'></hr>
              <div>
                <section id='dummy-cart-items'>
                  {[...Array(4)].map((_, i) => (
                    <div className='flex py-2' key={i}>
                      <div className='bg-base-800 h-24 w-48 rounded-sm' />
                      <p className='px-4'>3D GAMING</p>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
