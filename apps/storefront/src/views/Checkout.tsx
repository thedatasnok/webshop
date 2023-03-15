import Header from '@/components/layout/Header';
import { Button, Logo, TextField } from '@webshop/ui';
import { type } from 'os';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

const Checkout = () => {
  const deliveryOptions = [
    {
      name: 'Your local Eurospar',
    },
    {
      name: 'Package Box',
    },
    {
      name: 'Home Delivery',
    },
  ];

  const paymentOptions = [
    {
      name: 'Card',
    },
    {
      name: 'Vipps',
    },
    {
      name: 'Free',
    },
  ];

  const [delivery, setSelectedDelivery] = useState(deliveryOptions[0]);
  const [payment, setSelectedPayment] = useState(paymentOptions[0]);

  return (
    <div>
      <header className='mx-auto flex flex-col items-center justify-center py-10'>
        <NavLink to='/' className='flex-wrap items-center justify-center'>
          <div className='w-32'>
            <Logo variant='small' />
          </div>
        </NavLink>
      </header>

      <main>
        <div className='mx-auto grid max-w-screen-xl gap-8 px-2 lg:grid-cols-2'>
          <div className='font-title'>
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
                  ></TextField>
                </div>
                <label className='block text-sm'>Address</label>
                <div className='mb-2'>
                  <TextField
                    type='text'
                    className='w-full bg-transparent focus:outline-none'
                    placeholder='address'
                  ></TextField>
                </div>
                <label className='block text-sm'>Country</label>
                <div className='mb-2'>
                  <TextField
                    type='text'
                    className='w-full bg-transparent focus:outline-none'
                    placeholder='country'
                  ></TextField>
                </div>
                <label className='block text-sm'>Postal code</label>
                <div className='mb-2'>
                  <TextField
                    type='text'
                    className='w-full bg-transparent focus:outline-none'
                    placeholder='postal code'
                  ></TextField>
                </div>
              </div>
              <div className='flex flex-row gap-4 py-4'>
                <input type='checkbox' />
                <p>same shipping address</p>
              </div>
            </form>

            <div className='w-full py-16'>
              <h2>Shipping methods</h2>
              <div className='mx-auto w-full'>
                <RadioGroup value={delivery} onChange={setSelectedDelivery}>
                  <div className='space-y-4'>
                    {deliveryOptions.map((deliveryOptions) => (
                      <RadioGroup.Option
                        key={deliveryOptions.name}
                        value={deliveryOptions}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? 'border-primary-700 border-2'
                              : 'border-base-700 border'
                          }
                  }
                    bg-base-800 flex rounded-sm bg-opacity-40 px-5 py-4 focus:outline-none`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className='flex w-full items-center justify-between'>
                              <div className='flex items-center'>
                                <div className='text-sm'>
                                  <RadioGroup.Label
                                    as='p'
                                    className={`font-medium  ${
                                      checked ? 'text-white' : 'text-gray-900'
                                    }`}
                                  >
                                    {deliveryOptions.name}
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              {checked && (
                                <div className='shrink-0 text-white'></div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className='w-full'>
              <h2>Payment methods</h2>
              <div className='mx-auto w-full'>
                <RadioGroup value={payment} onChange={setSelectedPayment}>
                  <div className='space-y-4'>
                    {paymentOptions.map((paymentOptions) => (
                      <RadioGroup.Option
                        key={paymentOptions.name}
                        value={paymentOptions}
                        className={({ active, checked }) =>
                          `${
                            active
                              ? 'border-primary-700 border-2'
                              : 'border-base-700 border'
                          }
                  }
                  bg-base-800 flex rounded-sm bg-opacity-40 px-5 py-4 focus:outline-none`
                        }
                      >
                        {({ checked }) => (
                          <>
                            <div className='flex w-full items-center justify-between'>
                              <div className='flex items-center'>
                                <div className='text-sm'>
                                  <RadioGroup.Label
                                    as='p'
                                    className={`font-medium  ${
                                      checked ? 'text-white' : 'text-gray-900'
                                    }`}
                                  >
                                    {paymentOptions.name}
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              {checked && (
                                <div className='shrink-0 text-white'></div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
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
