import { NavLink } from 'react-router-dom';

interface CartCardProps {
  to: string;
  name: string;
  description?: string;
  price: string;
  quantity: string;
  image?: string;
}

const CartCard: React.FC<CartCardProps> = ({
  to,
  name,
  description,
  price,
  quantity,
  image = 'https://placehold.co/256x256/007676/007676.png',
}) => {
  return (
    <div className='border-base-800 border-b-2'>
      <div className='flex flex-row p-1'>
        <NavLink to={to} className='aspect-square w-1/4 sm:w-2/4'>
          <img src={image}></img>
        </NavLink>
        <div className='flex h-full w-full flex-col justify-items-stretch px-4'>
          <h2 className='font-title flex flex-grow text-2xl font-bold uppercase lg:text-4xl'>
            {name}
          </h2>
          <p>{description}</p>
          <div className='flex flex-row'>
            <p className='block sm:hidden'>Qty:{quantity}</p>
            <div className='block px-2 sm:hidden'>X</div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-2 sm:flex-row sm:items-center sm:gap-8 sm:text-xl md:gap-14 xl:gap-24'>
          <p className='hidden sm:block'>Qty:{quantity}</p>
          <h3 className='line-through'>$1000</h3>
          <div className='flex-col justify-center'>
            <h3 className='text-primary-600'>{price}</h3>
          </div>
          <div className='hidden px-3 sm:block'>X</div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
