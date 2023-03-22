import PageLayout from '@/components/layout/PageLayout';
import CartCard from '@/components/product/CartCard';
import { useCart } from '@/hooks/useCart';
import { RouteHref } from '@/router';
import { useFindProductsQuery } from '@/services/products';
import { Button } from '@webshop/ui';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ShoppingCart = () => {
  const { items } = useCart();
  const { data: products } = useFindProductsQuery({
    id: Object.keys(items).map((id) => parseInt(id)),
    allowEmptyIdList: false,
  });

  /**
   * Iterates over products and calculates the total price
   */
  const totalPrice = products?.reduce((total, product) => {
    return total + items[product.id] * product.price;
  }, 0);

  return (
    <PageLayout>
      <main>
        <div className='mx-auto max-w-screen-xl py-4'>
          <div id='cart-title' className='justify-start text-3xl'>
            <h1 className='font-title'>Shopping cart</h1>
          </div>

          <div className='font-title'>
            <div className='flex flex-row justify-end gap-4 text-lg sm:gap-12 md:gap-16 xl:gap-24'>
              <h3 className='hidden pr-2 sm:block sm:pr-9'>Quantity</h3>
              <h3>Total</h3>
              <h3>Delete</h3>
            </div>
          </div>

          <div className='mx-auto flex w-fit grid-cols-2 flex-col gap-2'>
            {products?.map((product, i) => (
              <CartCard
                key={product.id}
                productId={product.id}
                to={'/products/' + product.id}
                name={product.name}
                quantity={items[product.id]}
                price={product.price}
                image={product.imageUrls[0]}
              />
            ))}
          </div>
          <div
            id='cart-total'
            className='my-8 flex w-full justify-center text-xl sm:my-0 sm:flex-col'
          >
            <a className='self-end sm:py-4'>Total: ${totalPrice?.toFixed(2)}</a>
          </div>
          <div id='checkout' className='sm:flex sm:flex-col'>
            <NavLink to={RouteHref.CHECKOUT} className='sm:self-end'>
              <Button className='h-10 w-full px-6 font-semibold uppercase sm:w-fit'>
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
