import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  to: string;
  name: string;
  price: number;
  previousPrice: number;
  isDiscount: boolean;
  shortDescription: string;
  image?: string;
  className?: string;
}

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
  const formatter = Intl.NumberFormat('en-US');

  return (
    <NavLink
      to={to}
      className={clsx(
        'border-base-800 bg-base-800/30 hover:bg-primary-900/10 hover:border-primary-800 group  relative flex flex-col rounded-sm border transition-colors',
        className
      )}
    >
      <img src={image} alt={name} className='aspect-square w-full' />

      {/* Top-right pill */}
      {isDiscount && (
        <span className='bg-secondary-800/50 border-secondary-800 text-secondary-50 absolute right-1 top-1 rounded-sm border px-0.5 text-xs'>
          SALE
        </span>
      )}

      <h3 className='font-title group-hover:text-primary-600 mt-0.5 truncate px-2 text-xl font-bold uppercase'>
        {name}
      </h3>

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
          ${formatter.format(price)}
        </span>
        {isDiscount && (
          <span className='text-base-400 ml-2 text-sm'>
            PREV. ${formatter.format(previousPrice)}
          </span>
        )}
      </p>

      {/* Bottom right id decoration */}
      <span className='text-base-400 font-title -mb-0.5 -mt-2 mr-0.5 text-right text-xs tracking-wide'>
        #{id.toString().padStart(4, '0')}
      </span>
    </NavLink>
  );
};

export default ProductCard;
