import { updateCartItem } from '@/store/cart.slice';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

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

export default Counter;
