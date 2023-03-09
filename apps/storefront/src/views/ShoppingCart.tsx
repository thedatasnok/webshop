import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@webshop/ui';
import { NavLink } from 'react-router-dom';

const ShoppingCart = () => {
  return (
    <PageLayout>
      <main>
        <div className='mx-auto max-w-screen-xl py-4'>
          <div id='cart-title' className='justify-start text-3xl'>
            <h1>Shopping cart</h1>
          </div>

          <section id='dummy-cart-items'>
            {[...Array(4)].map((_, i) => (
              <div className='flex py-2' key={i}>
                <div className='bg-base-800 h-24 w-48 rounded-sm' />
                <p className='px-4'>3D GAMING</p>
              </div>
            ))}
          </section>
          <div
            id='cart-total'
            className='my-8 flex w-full justify-center text-xl sm:my-0 sm:flex-col'
          >
            <a className='self-end'>Total: $112,000</a>
          </div>
          <div id='checkout' className='sm:flex sm:flex-col'>
            <NavLink to='/checkout' className='sm:self-end'>
              <Button className='mt-2 h-10 w-full px-6 font-semibold uppercase sm:w-fit'>
                Checkout
              </Button>
            </NavLink>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default ShoppingCart;
