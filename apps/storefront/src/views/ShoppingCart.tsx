import PageLayout from '@/components/layout/PageLayout';
import ProductListCard from '@/components/product/ProductListCard';
import { useCart } from '@/hooks/useCart';
import { RouteHref } from '@/router';
import { useFindProductsQuery } from '@/services/products';
import { removeCartItem, updateCartItem } from '@/store/cart.slice';
import { Button } from '@webshop/ui';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
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
              <ProductListCard
                key={product.id}
                to={'/products/' + product.id}
                name={product.name}
                shortDescription={product.shortDescription}
                image={product.imageUrls[0]}
              >
                <ProductListCardCartActions
                  productId={product.id}
                  quantity={items[product.id]}
                  price={product.price}
                  previousPrice={product.previousPrice}
                  isDiscount={product.isDiscount}
                />
              </ProductListCard>
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

interface ProductListCardCartActionsProps {
  productId: number;
  price: number;
  previousPrice: number;
  quantity: number;
  isDiscount: boolean;
}

const ProductListCardCartActions: React.FC<ProductListCardCartActionsProps> = ({
  productId,
  price,
  previousPrice,
  quantity,
  isDiscount,
}) => {
  const dispatch = useDispatch();
  const totalPrice = price * quantity;
  const previousTotal = previousPrice * quantity;

  /**
   * If the quantity is higher than 1, decrements the quantity by 1.
   * Updates to local storage.
   */
  function decrementQuantity() {
    if (quantity > 1) {
      dispatch(
        updateCartItem({
          productId,
          quantity: quantity - 1,
        })
      );
    }
  }

  /**
   * Increments the quantity by 1 and updates to local storage.
   */
  function incrementQuantity() {
    dispatch(
      updateCartItem({
        productId,
        quantity: quantity + 1,
      })
    );
  }
  return (
    <div className='flex flex-row items-center gap-5 sm:items-center sm:gap-12 sm:text-xl md:gap-16 xl:gap-24'>
      <div className='bg-base-800/40 font-title relative mr-auto mt-1 flex flex-row rounded-sm'>
        <button onClick={decrementQuantity} disabled={quantity === 1}>
          <p
            className={clsx('font-title mx-2 text-2xl sm:mx-4 sm:text-4xl ', {
              'text-base-600': quantity === 1,
            })}
          >
            -
          </p>
        </button>
        <p className='flex w-6 items-center justify-center text-xl sm:text-2xl'>
          {quantity}
        </p>
        <button onClick={incrementQuantity}>
          <p className='mx-2 text-2xl sm:mx-4 sm:text-4xl'>+</p>
        </button>
      </div>
      <div className='flex flex-col items-center justify-center gap-1'>
        <h3 className=''>${totalPrice}</h3>
        {isDiscount && (
          <div className='bg-secondary/30 border-secondary text-secondary-50 w-fit whitespace-nowrap rounded-sm border px-1 text-xs'>
            ${previousTotal - totalPrice} off
          </div>
        )}
      </div>
      <button
        onClick={() => {
          dispatch(removeCartItem(productId));
        }}
      >
        <div className='bg-base-800 relative flex h-6 w-6 items-center justify-center bg-opacity-40'>
          <span className='text-base-400 font-title absolute pb-1 text-3xl'>
            x
          </span>
        </div>
      </button>
    </div>
  );
};

export default ShoppingCart;
