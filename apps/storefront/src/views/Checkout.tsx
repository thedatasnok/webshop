import Header from '@/components/layout/Header';
import { Button, Logo } from '@webshop/ui';
import { NavLink } from 'react-router-dom';

const Checkout = () => {
  return (
    <div className='wrapper'>
      <header className='mx-auto flex flex-col items-center justify-center py-10'>
        <NavLink to='/' className='flex-wrap items-center justify-center'>
          <div className='w-32'>
            <Logo variant='small' />
          </div>
        </NavLink>
      </header>

      <main>
        <div className='mx-auto grid max-w-screen-2xl sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-56'>
          <div className='px-4 pt-8'>
            <section>
              <div className='bg-base-800 mt-4 rounded-sm py-4 px-6'>
                <p className='pb-4 text-xl'>Delivery information</p>
                <label className='block pb-1 text-sm'>Full name</label>
                <div className='overflow bg-base-700 relative mb-4 pl-1'>
                  <input
                    type='text'
                    id='name'
                    className='w-full bg-transparent focus:outline-none'
                    placeholder='Mr. Bofamai Phatt'
                  />
                </div>
                <label className='block pb-1 text-sm'>Email</label>
                <div className='bg-base-700 relative mb-4 pl-1'>
                  <input
                    type='text'
                    id='email'
                    className='w-full bg-transparent focus:outline-none'
                    placeholder='email@sugma.no'
                  />
                </div>

                <label className='block pb-1 text-sm'>Billing Address</label>
                <div className='mb-2 flex flex-col gap-4 sm:flex-row '>
                  <div className='bg-base-700 w-fit pl-1'>
                    <input
                      type='text'
                      id='zip-code'
                      className='w-full bg-transparent focus:outline-none'
                      placeholder='Postal code'
                    />
                  </div>
                  <div className='bg-base-700 w-fit pl-1'>
                    <input
                      type='text'
                      id='address'
                      className='w-full bg-transparent focus:outline-none'
                      placeholder='Address'
                    />
                  </div>
                  <div className='bg-base-700 w-fit'>
                    <input
                      type='text'
                      id='country'
                      className='w-full bg-transparent focus:outline-none'
                      placeholder='Country'
                    />
                  </div>
                </div>
                <div className='pt-2'>
                  <button>checkbox - Same shipping address</button>
                </div>
              </div>
            </section>

            <section>
              <div className='bg-base-800 mt-4 rounded-sm py-4 px-6'>
                <p className='pb-4 text-xl'>Shipping Methods</p>
                <form className='grid gap-6'>
                  <div className='relative'>
                    <button>option 1</button>
                  </div>
                  <div className='relative'>
                    <button>option 2</button>
                  </div>
                </form>
              </div>
            </section>

            <section>
              <div className='bg-base-800 mt-4 rounded-sm py-4 px-6'>
                <p className='pb-4 text-xl'>Payment options</p>
                <form className='grid gap-6'>
                  <div className='relative'>
                    <button>Free</button>
                  </div>
                  <div className='relative'>
                    <button>PayUsBofa</button>
                  </div>
                </form>
              </div>
            </section>

            <div className='flex justify-center pt-5 pb-5'>
              <Button className='w-30 h-8 rounded-sm'>Confirm & Buy</Button>
            </div>
          </div>

          <div className='px-4 pt-8'>
            <div className='mt-10 bg-gray-50 px-4'>
              <p className='text-xl text-gray-400'>Shopping cart</p>
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

              <div className='mt-6 flex items-center justify-end gap-4'>
                <p className='text-sm text-gray-900'>Total</p>
                <p className='text-2xlld text-gray-900'>$408.00</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
