import PageLayout from '@/components/layout/PageLayout';
import ProductListCard from '@/components/product/ProductListCard';
import { useCart } from '@/hooks/useCart';
import { RouteHref } from '@/router';
import { useFindProductsQuery } from '@/services/products';
import { clearCart, removeCartItem, updateCartItem } from '@/store/cart.slice';
import { Button } from '@webshop/ui';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const ShoppingCart = () => {
  const { items, isEmpty } = useCart();
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

  const dispatch = useDispatch();

  /**
   * Clears the cart prompting the user for confirmation
   */
  function handleClearCart() {
    const confirmed = window.confirm(
      'Are you sure you want to clear your cart?'
    );
    if (confirmed) {
      dispatch(clearCart());
    }
  }

  return (
    <PageLayout>
      <main>
        <div className='mx-auto max-w-screen-xl py-4'>
          <div id='cart-title' className='flex justify-between'>
            <h1 className='font-title text-3xl'>Shopping cart</h1>
            <button onClick={handleClearCart} className='text-sm underline'>
              clear cart
            </button>
          </div>

          <div className='font-title'>
            <div className='mr-2 flex flex-row justify-end gap-4 text-lg sm:mr-0 sm:gap-6 md:gap-7'>
              <h3 className='hidden pr-2 sm:block sm:pr-14 md:pr-16'>
                Quantity
              </h3>
              <h3>Total</h3>
              <h3 className='hidden sm:block'>Delete</h3>
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
                cart={true}
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
          {isEmpty ? (
            <div className='flex flex-col items-center justify-center gap-2 pt-8'>
              <hr className='text-base-700 w-full'></hr>
              Cart is empty
            </div>
          ) : (
            <div>
              <div
                id='cart-total'
                className='my-8 flex w-full justify-center text-xl sm:my-0 sm:flex-col'
              >
                <a className='self-end sm:py-4'>
                  Sum: ${totalPrice?.toFixed(2)}
                </a>
              </div>
              <div id='checkout' className='flex w-full justify-end text-xl'>
                <NavLink to={RouteHref.CHECKOUT}>
                  <Button className='h-10 w-full px-6 font-semibold uppercase sm:w-fit'>
                    Checkout
                  </Button>
                </NavLink>
              </div>
            </div>
          )}
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

  return (
    <div className='z-20 flex flex-col items-end justify-end gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-0'>
      <div className='flex sm:gap-8 md:gap-10'>
        {/* Counter */}
        <div className='hidden sm:block'>
          <Counter productId={productId} quantity={quantity} />
        </div>
        {/* Total price */}
        <div
          className={clsx({
            'flex flex-col items-end': isDiscount,
            'flex flex-row items-center': !isDiscount,
          })}
        >
          <h3 className='flex w-16 justify-end text-xl'>${totalPrice}</h3>
          {isDiscount && (
            <div className='bg-secondary/30 border-secondary text-secondary-50 w-fit whitespace-nowrap rounded-sm border px-1 text-xs'>
              -${previousTotal - totalPrice}
            </div>
          )}
        </div>
        {/* Delete */}
        <button
          onClick={() => {
            dispatch(removeCartItem(productId));
          }}
        >
          <div className='bg-base-800 relative hidden h-6 w-6 items-center justify-center bg-opacity-40 sm:flex'>
            <span className='text-base-400 font-title absolute pb-1 text-3xl'>
              x
            </span>
          </div>
        </button>
      </div>

      <div className='flex gap-2'>
        {/* Mobile Counter */}
        <div className='block sm:hidden'>
          <Counter productId={productId} quantity={quantity} />
        </div>
        {/* Mobile Delete */}
        <button
          className='z-10 flex aspect-square items-end justify-end sm:hidden'
          onClick={() => {
            dispatch(removeCartItem(productId));
          }}
        >
          <div className='bg-base-800/40 relative flex aspect-square h-8 w-8 items-center justify-center pt-1'>
            <span className='text-base-400 font-title absolute pb-1 text-xl'>
              x
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

interface CounterProps {
  productId: number;
  quantity: number;
}

const Counter: React.FC<CounterProps> = ({ productId, quantity }) => {
  const dispatch = useDispatch();

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
    <div className='bg-base-800/40 font-title relative mt-1 flex flex-row justify-end'>
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
  );
};

export default ShoppingCart;
