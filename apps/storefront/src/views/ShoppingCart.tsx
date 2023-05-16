import PageLayout from '@/components/layout/PageLayout';
import ProductListCard from '@/components/product/ProductListCard';
import { useCart } from '@/hooks/useCart';
import { RouteHref } from '@/router';
import { useFindProductsQuery } from '@/services/products';
import { clearCart, removeCartItem, updateCartItem } from '@/store/cart.slice';
import { Button, DialogPrompt, formatPrice } from '@webshop/ui';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import {
  RiAddLine,
  RiCloseLine,
  RiShoppingCartLine,
  RiSubtractLine,
} from 'react-icons/ri';
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
  const [isOpen, setIsOpen] = useState(false);

  function openDialog() {
    setIsOpen(true);
  }

  function closeDialog() {
    setIsOpen(false);
  }

  function handleClearCart() {
    dispatch(clearCart());
    setIsOpen(false);
  }

  return (
    <PageLayout>
      <main className='mx-auto max-w-screen-xl'>
        <div className='mx-auto flex max-w-screen-xl items-center justify-center py-4'>
          <h1 className='font-title text-2xl font-semibold uppercase'>
            Shopping cart
          </h1>
          <div className='ml-auto'>
            {!isEmpty && (
              <Button
                onClick={openDialog}
                style='outline'
                variant='neutral'
                className='text-xs'
              >
                <RiCloseLine className='-ml-1.5 h-4 w-4' />
                <span className='pt-px'>Clear cart</span>
              </Button>
            )}
            <DialogPrompt
              isOpen={isOpen}
              onClose={closeDialog}
              title='clear cart'
              message='Are you sure you want to clear your cart?'
              action={handleClearCart}
            />
          </div>
        </div>

        <div className='font-title mr-1 flex flex-row justify-end gap-4 uppercase sm:mr-0 sm:gap-4 md:gap-7'>
          <h3 className='hidden sm:block sm:pr-16 md:pr-14'>Quantity</h3>
          <h3>Total</h3>
          <h3 className='hidden sm:block'>Delete</h3>
        </div>

        <div className='mx-auto flex w-fit flex-col'>
          {products?.map((product, i, array) => (
            <ProductListCard
              key={product.id}
              id={product.id}
              to={'/products/' + product.id}
              name={product.name}
              shortDescription={product.shortDescription}
              image={product.imageUrls[0]}
              className={i !== array.length - 1 ? 'border-b' : ''}
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
          <div>
            <NavLink
              className={clsx(
                'border-base-950 hover:text-primary-600 text-base-400 group flex cursor-pointer',
                'flex-col items-center justify-center gap-2 rounded-sm border p-4 outline-none sm:transition '
              )}
              to={RouteHref.PRODUCTS}
            >
              <RiAddLine className='absolute h-8 w-8 -translate-y-14 translate-x-9' />
              <RiShoppingCartLine className='h-16 w-16' />
              <p className='text-center'>
                Looks like there is nothing in your cart yet. <br />
                Go shopping!
              </p>
            </NavLink>
          </div>
        ) : (
          <>
            <div className='font-title pt-2 text-center text-xl font-semibold uppercase sm:pt-2 sm:text-right'>
              {/* default value to 0 if products are not loaded  */}
              Sum: {formatPrice(totalPrice || 0)}
            </div>

            <NavLink
              to={RouteHref.CHECKOUT}
              className='mx-auto mt-2 block h-fit w-fit sm:ml-auto sm:mr-0'
            >
              <Button type='button' className='text-lg font-semibold'>
                Checkout
              </Button>
            </NavLink>
          </>
        )}
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
    <div className='flex flex-col items-end justify-end gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-0'>
      <div className='flex sm:items-center sm:gap-8 md:gap-10'>
        {/* Counter */}
        <div className='hidden sm:block'>
          <Counter productId={productId} quantity={quantity} />
        </div>
        {/* Total price */}
        <div className='font-title flex flex-col items-end font-semibold'>
          <div className='flex w-16 flex-col items-end justify-end text-xl'>
            {formatPrice(totalPrice)}
          </div>
          <div
            className={clsx(
              'bg-secondary/30 border-secondary text-secondary-50 w-fit whitespace-nowrap rounded-sm border px-1 text-xs',
              !isDiscount && 'invisible sm:hidden'
            )}
          >
            {formatPrice(previousTotal - totalPrice)}
          </div>
        </div>
        {/* Delete */}
        <button
          onClick={() => dispatch(removeCartItem(productId))}
          className='border-base-700 hidden aspect-square items-center justify-center rounded-sm border sm:flex'
        >
          <RiCloseLine className='hover:fill-error w-6' />
        </button>
      </div>

      <div className='flex items-end gap-2 sm:hidden'>
        {/* Mobile Counter */}
        <Counter productId={productId} quantity={quantity} />

        {/* Mobile Delete */}
        <button
          onClick={() => {
            dispatch(removeCartItem(productId));
          }}
        >
          <div className='border-base-700 flex aspect-square items-center justify-end rounded-sm border sm:hidden'>
            <RiCloseLine className='w-6' />
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
  const numberInputRef = useRef<HTMLInputElement>(null);

  /**
   * Decrements the quantity by 1.
   * Ignores if the quantity is above 1.
   */
  function decrementQuantity() {
    if (quantity > 1) updateQuantity(quantity - 1);
  }

  /**
   * Increments the quantity by 1.
   * Ignores if the quantity is above 999.
   */
  function incrementQuantity() {
    if (quantity < 999) updateQuantity(quantity + 1);
  }

  /**
   * Updates the quantity, writing it to the store which further updates local storage.
   *
   * @param newQuantity the new quantity of the product
   */
  const updateQuantity = (newQuantity: number) => {
    dispatch(
      updateCartItem({
        productId,
        quantity: newQuantity,
      })
    );

    if (numberInputRef.current)
      numberInputRef.current.valueAsNumber = newQuantity;
  };

  /**
   * Handles the change event emitted by the number input, updating the quantity with the new value given its valid.
   */
  const handleNumberChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedNumber = parseInt(e.target.value);

    if (parsedNumber >= 1 && parsedNumber <= 999) updateQuantity(parsedNumber);
    else if (parsedNumber > 999) updateQuantity(999);
  };

  /**
   * When user focus exits the input, we need to make sure that the number is valid.
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isNaN(e.target.valueAsNumber) || e.target.valueAsNumber <= 0)
      updateQuantity(1);

    if (e.target.valueAsNumber > 999) updateQuantity(999);
  };

  return (
    <div className='border-base-700 flex rounded-sm border'>
      <button
        onClick={decrementQuantity}
        disabled={quantity === 1}
        className='hover:bg-base-900 transition-colors disabled:pointer-events-none'
      >
        <RiSubtractLine
          className={clsx(
            {
              'fill-base-600': quantity === 1,
            },
            'w-6'
          )}
        />
      </button>

      <input
        type='number'
        ref={numberInputRef}
        defaultValue={quantity}
        onChange={handleNumberChanged}
        onBlur={handleBlur}
        className='bg-base-950 focus:border-base-700 border-base-700 h-6 w-14 border-b-transparent border-t-transparent text-center focus:border-b-transparent focus:border-t-transparent focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none'
      />

      <button
        onClick={incrementQuantity}
        disabled={quantity === 999}
        className='hover:bg-base-800 transition-colors disabled:pointer-events-none'
      >
        <RiAddLine
          className={clsx(
            {
              'fill-base-600': quantity === 999,
            },
            'w-6'
          )}
        />
      </button>
    </div>
  );
};

export default ShoppingCart;
