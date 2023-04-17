import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

interface ProductListCardProps {
  to: string;
  id?: number;
  name: string;
  shortDescription: string;
  image?: string;
  children: React.ReactNode;
  cart?: boolean;
  isDiscount?: boolean;
  className?: string;
}

const ProductListCard: React.FC<ProductListCardProps> = ({
  to,
  id,
  name,
  shortDescription,
  image,
  children,
  cart = false,
  isDiscount,
  className,
}) => {
  return (
    <div
      className={clsx('border-base-800 relative flex p-1', className, {
        ' hover:bg-primary-900/10 hover:border-primary-800 rounded-sm border transition-colors group':
          cart == false,
      })}
    >
      <NavLink to={to} className='flex flex-grow  '>
        <img
          src={image}
          alt={name}
          className='aspect-square w-4/12 md:w-1/6'
        ></img>

        {/* Top-left pill */}
        {isDiscount && (
          <span className='bg-secondary-800/50 border-secondary-800 text-secondary-50 absolute left-2 top-2 rounded-sm border px-0.5 text-xs'>
            SALE
          </span>
        )}

        <div
          className={clsx(
            'max-w-180 flex flex-col overflow-hidden text-ellipsis sm:max-w-xs md:max-w-md',
            {
              'lg:max-w-2xl': cart === true,
              'lg:max-w-xs': cart === false,
            }
          )}
        >
          <h3 className='font-title group-hover:text-primary-600 mt-0.5 truncate px-2 text-xl font-bold uppercase'>
            {name}
          </h3>
          <p className='group-hover:text-primary-700 mb-0.5 truncate px-2 text-xs after:inline-block after:content-[""]'>
            {shortDescription}
          </p>
        </div>

        {/* Bottom left id decoration */}
        {!cart && (
          <span className='text-base-400 font-title absolute bottom-1 -mb-0.5 -mt-2 mr-0.5 rounded-sm px-0.5 text-right text-xs tracking-wide'>
            #{id?.toString().padStart(4, '0')}
          </span>
        )}
      </NavLink>
      <div className='flex w-1/12 justify-end'>{children}</div>
    </div>
  );
};

export default ProductListCard;
