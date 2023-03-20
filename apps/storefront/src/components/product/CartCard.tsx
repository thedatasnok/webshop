import { CartItem, removeCartItem, updateCartItem } from '@/store/cart.slice';
import clsx from 'clsx';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

interface CartCardProps {
  to: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CartCard: React.FC<CartCardProps> = ({
  to,
  productId,
  name,
  price,
  quantity,
  image = 'https://placehold.co/256x256/007676/007676.png',
}) => {
  const dispatch = useDispatch();
  const totalPrice = price * quantity;

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
    <div className='border-base-800 border-b-2'>
      <div className='flex flex-row p-1'>
        <NavLink to={to} className='sm:flex sm:flex-row'>
          <img
            src={image}
            className='aspect-square w-1/3 sm:w-2/6 md:w-1/6'
          ></img>
          <div className='flex max-h-full w-full flex-col'>
            <h2 className='font-title w-32 overflow-hidden truncate text-ellipsis text-2xl font-bold uppercase sm:w-48 sm:px-2 md:w-64 xl:w-96 xl:text-3xl'>
              {name}
            </h2>
          </div>
        </NavLink>
        <div className='flex flex-row items-center justify-center gap-5 sm:items-center sm:gap-12 sm:text-xl md:gap-16 xl:gap-24'>
          <div className='bg-base-800 font-title relative flex w-full flex-row bg-opacity-20'>
            <button onClick={decrementQuantity} disabled={quantity === 1}>
              <p
                className={clsx(
                  'font-title mx-2 text-2xl sm:mx-4 sm:text-4xl ',
                  {
                    'text-base-600': quantity === 1,
                  }
                )}
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
          <div className='flex flex-col justify-center'>
            <h3 className='line-through'>$10000</h3>
            <h3 className='text-primary-600'>${totalPrice}</h3>
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
      </div>
    </div>
  );
};

export default CartCard;
