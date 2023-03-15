import PageLayout from '@/components/layout/PageLayout';
import CartCard from '@/components/product/CartCard';
import { useCart } from '@/hooks/useCart';
import { useFindProductQuery, useFindProductsQuery } from '@/services/products';
import { Button } from '@webshop/ui';
import { NavLink } from 'react-router-dom';

const ShoppingCart = () => {
  const { items } = useCart();
  const { data: products } = useFindProductsQuery({
    id: Object.keys(items).map(id => parseInt(id)),
    allowEmptyIdList: false,
  });

  return (
    <PageLayout>
      <main>
        <div className='mx-auto max-w-screen-xl py-4'>
          <div id='cart-title' className='justify-start text-3xl'>
            <h1 className='font-title'>Shopping cart</h1>
          </div>

          <div className='font-title hidden sm:block'>
            <div className='font-title flex flex-row justify-between gap-8 text-lg md:gap-14 xl:gap-24'>
              <div className='w-full'></div>
              <h3 className=''>Quantity</h3>
              <h3 className=''>Price</h3>
              <h3 className=''>Total</h3>
              <h3 className=''>Delete</h3>
            </div>
          </div>

          {/* {items?.map((item, i) => (
              <div key={item.productId}>
                {item.productId}: {item.quantity}
              </div> */}

          <div className='mx-auto flex w-fit grid-cols-2 flex-col gap-4'>
            {products?.map((product, i) => (
              <CartCard
                key={product.id}
                to={'/products/' + product.id}
                name={product.name}
                description=''
                quantity={"" + items[product.id]}
                price={'$' + product.price}
                image={product.imageUrls[0]}
              />
            ))}
          </div>
          <div
            id='cart-total'
            className='my-8 flex w-full justify-center text-xl sm:my-0 sm:flex-col'
          >
            <a className='self-end sm:py-4'>Total: $112,000</a>
          </div>
          <div id='checkout' className='sm:flex sm:flex-col'>
            <NavLink to='/checkout' className='sm:self-end'>
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
