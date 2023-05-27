import { formatPrice } from '@webshop/ui';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import OnSalePill from './OnSalePill';

interface ProductCardProps {
  id: number;
  to: string;
  name: string;
  price: number;
  previousPrice: number | null;
  isDiscount: boolean;
  shortDescription: string;
  image?: string;
  className?: string;
}

/**
 * A card that displays a product as a grid item.
 */
const ProductCard: React.FC<ProductCardProps> = ({
  id,
  to,
  name,
  price,
  previousPrice,
  shortDescription,
  isDiscount,
  image = 'https://placehold.co/256x256/007676/007676.png',
  className,
}) => {
  return (
    <li>
      <NavLink
        to={to}
        className={clsx(
          'border-base-800 bg-base-900/30 hover:bg-primary-900/10 hover:border-primary-800 group  relative flex flex-col rounded-sm border transition-colors',
          className
        )}
      >
        <img
          loading='lazy'
          src={image}
          alt={name}
          className='aspect-square w-full'
        />

        {/* Top-right pill */}
        {isDiscount && <OnSalePill className='absolute right-1 top-1' />}

        <span className='font-title group-hover:text-primary-600 mt-0.5 block truncate px-2 text-xl font-bold uppercase'>
          {name}
        </span>

        {/* The after styles are there in order make the height of the line render even if there is no text in the paragraph */}
        <p className='group-hover:text-primary-700 mb-0.5 truncate px-2 text-xs after:inline-block after:content-[""]'>
          {shortDescription}
        </p>

        <p className='font-title truncate px-2 font-semibold tracking-wide'>
          <span
            className={clsx(
              'group-hover:text-primary-600 text-xl',
              isDiscount && 'text-primary-600'
            )}
          >
            {formatPrice(price)}
          </span>
          {isDiscount && previousPrice && (
            <span className='text-base-400 ml-2 text-sm'>
              PREV. {formatPrice(previousPrice)}
            </span>
          )}
        </p>

        {/* Bottom right id decoration */}
        <span className='text-base-400 font-title -mb-0.5 -mt-2 mr-0.5 text-right text-xs tracking-wide'>
          #{id.toString().padStart(4, '0')}
        </span>
      </NavLink>
    </li>
  );
};

export default ProductCard;
