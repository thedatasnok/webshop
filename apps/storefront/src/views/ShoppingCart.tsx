import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import NavBar from '@/components/navigation/NavBar';
import { Button } from '@webshop/ui';

const ShoppingCart = () => {
  return (
    <div>
      <Header />

      <main>
        <div className='mx-auto max-w-screen-xl py-10'>
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
            className='flex w-full flex-col self-end py-6 text-xl'
          >
            <a className='self-end'>Total: $112,000</a>
          </div>
          <div id='checkout' className='flex w-full flex-col text-lg'>
            <Button className='self-end rounded-sm'>Checkout</Button>
          </div>
        </div>

        <Footer />
        <NavBar />
      </main>
    </div>
  );
};

export default ShoppingCart;
