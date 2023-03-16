import { CartItem, removeCartItem, updateCartItem } from '@/store/cart.slice';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

interface CartCardProps {
  to: string;
  productId: number;
  name: string;
  price: string;
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

  /**
   * Returns the price times the quantity.
   * @returns the price times the quantity.
   */
  function totalPrice() {
    //Removes '$' from the price
    var priceAsNumber = price.slice(1);
    return parseInt(priceAsNumber) * quantity;
  }

  function update() {
    dispatch(
      updateCartItem({
        productId,
        quantity,
      } as CartItem)
    );
  }

  /**
   * If the quantity is higher than 1, decrements the quantity by 1.
   * Updates to local storage.
   */
  function decrementQuantity() {
    if (quantity > 1) {
      quantity = quantity - 1;
      update();
    }
  }

  /**
   * Increments the quantity by 1 and updates to local storage.
   */
  function incrementQuantity() {
    quantity = quantity + 1;
    update();
  }
  return (
    <div className='border-base-800 border-b-2'>
      <div className='flex flex-row p-1'>
        <NavLink to={to} className='aspect-square w-1/4'>
          <img src={image}></img>
        </NavLink>
        <div className='flex max-h-full w-full flex-col justify-center'>
          <h2 className='font-title flex-1 px-2 text-2xl font-bold uppercase lg:text-4xl'>
            {name}
          </h2>
          <div className='relative flex w-full flex-row'>
            <button onClick={decrementQuantity}>
              <RiArrowDropLeftLine className='h-8 w-8 sm:h-12 sm:w-12'></RiArrowDropLeftLine>
            </button>
            <p className='font-title flex items-center text-2xl'>{quantity}</p>
            <button onClick={incrementQuantity}>
              <RiArrowDropRightLine className='h-8 w-8 sm:h-12 sm:w-12'></RiArrowDropRightLine>
            </button>
          </div>
        </div>
        <div className='flex flex-row items-center justify-center sm:items-center sm:gap-12 sm:text-xl md:gap-16 xl:gap-24'>
          <div className='flex flex-col justify-center'>
            <h3 className='line-through'>$10000</h3>
            <h3 className='text-primary-600'>${totalPrice()}</h3>
          </div>
          <button
            className='pl-12 pr-2 sm:pl-0'
            onClick={() => {
              dispatch(removeCartItem(productId));
            }}
          >
            <div className='bg-base-800 relative flex h-6 w-6 items-center justify-center'>
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
