import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

interface ProductListCardProps {
  to: string;
  id?: number;
  name: string;
  shortDescription: string;
  image?: string;
  children: React.ReactNode;
  hoverEffects?: boolean;
  isDiscount?: boolean;
  className?: string;
}

/**
 * A list variant of the product card.
 * This component will render the left side of the card,
 * and the provided children prop will be rendered on the right side.
 */
const ProductListCard: React.FC<ProductListCardProps> = ({
  to,
  name,
  shortDescription,
  image,
  children,
  hoverEffects = false,
  isDiscount,
  className,
}) => {
  return (
    <li
      className={clsx(
        'border-base-800 relative grid grid-cols-5 overflow-hidden p-1',
        hoverEffects &&
          'hover:bg-primary-900/10 hover:border-primary-800 group rounded-sm border transition-colors',
        className
      )}
    >
      <NavLink to={to} className='col-span-3 flex flex-1 overflow-hidden'>
        <img
          src={image}
          alt={name}
          className='aspect-square h-fit w-1/3 self-center md:w-1/6'
        />

        {/* Top-left on sale pill */}
        {isDiscount && (
          <span className='bg-secondary-800/50 border-secondary-800 text-secondary-50 absolute left-2 top-2 rounded-sm border px-0.5 text-xs'>
            SALE
          </span>
        )}

        <div className='flex flex-col overflow-hidden'>
          <h3 className='font-title group-hover:text-primary-600 truncate px-2 text-xl font-bold uppercase'>
            {name}
          </h3>
          <p className='group-hover:text-primary-700 text-base-400 preserve-line -mt-1 mb-0.5 line-clamp-2 px-2 text-xs'>
            {shortDescription}
          </p>
        </div>
      </NavLink>
      <div className='col-span-2 flex justify-end'>{children}</div>
    </li>
  );
};

export default ProductListCard;
