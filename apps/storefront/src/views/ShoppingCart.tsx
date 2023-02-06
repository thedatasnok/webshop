import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Button } from '@webshop/ui';

const ShoppingCart = () => {
  return (
    <div>
      <Header />

      <main>
        <div className='mx-auto max-w-screen-xl px-20 py-10'>
          <div id='cart-title' className='justify-start text-3xl'>
            <h1>Shopping cart</h1>
          </div>

          <section id='dummy-cart-items'>
            {[...Array(4)].map((_, i) => (
              <div className='py-2 flex' key={i}>
                <div className='h-24 w-48 rounded-sm bg-base-800' />
                <p className='px-4'>3D GAMING</p>
              </div>
            ))}
          </section>
          <div
            id='cart-total'
            className='flex flex-col w-full self-end py-6 text-xl'
          >
            <a className='self-end'>Total: $112,000</a>
          </div>
          <div id='checkout' className='flex flex-col w-full text-lg'>
            <Button className='self-end rounded-sm'>Checkout</Button>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default ShoppingCart;
