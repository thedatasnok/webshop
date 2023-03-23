import { Button } from '@webshop/ui';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

interface ProductCardProps {
  to: string;
  name: string;
  price: number;
  previousPrice: number;
  isDiscount: boolean;
  shortDescription: string;
  image?: string;
  size?: 'sm' | 'md';
}

const ProductCard: React.FC<ProductCardProps> = ({
  to,
  name,
  price,
  previousPrice,
  shortDescription,
  isDiscount,
  image = 'https://placehold.co/256x256/007676/007676.png',
  size = 'md',
}) => {
  return (
    <NavLink to={to} className='text-base-50'>
      <div className='border-base-700 border-2 p-1'>
        <img src={image} className='aspect-square w-full'></img>
        <h2 className='font-title text-xl font-bold uppercase'>{name}</h2>
        <p className='pb-2 text-xs'>{shortDescription}</p>
        <div className='flex'>
          <h3
            className={clsx({
              'text-primary-200 text-xl': isDiscount,
              '': !isDiscount,
            })}
          >
            ${price}
          </h3>
          {isDiscount && (
            <div className='text-base-400 ml-1 mt-1 line-through'>
              ${previousPrice}
            </div>
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
