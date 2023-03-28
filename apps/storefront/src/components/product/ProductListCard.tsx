import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

interface ProductListCardProps {
  to: string;
  name: string;
  shortDescription: string;
  image?: string;
  children: React.ReactNode;
  cart?: boolean;
}

const ProductListCard: React.FC<ProductListCardProps> = ({
  to,
  name,
  shortDescription,
  image,
  children,
  cart = false,
}) => {
  return (
    <div className='border-base-800 z-0 border-b-2 pb-1'>
      <div className='flex p-1 sm:flex-row'>
        <div className='flex-grow-1 relative z-20 flex w-full flex-row'>
          <NavLink to={to} className='flex flex-grow'>
            <img src={image} className='aspect-square w-4/12 md:w-1/6'></img>
            <div
              className={clsx(
                'max-w-180 flex flex-col overflow-hidden text-ellipsis pl-2 sm:max-w-xs md:max-w-md',
                {
                  'lg:max-w-2xl': cart === true,
                  'lg:max-w-xs': cart === false,
                }
              )}
            >
              <h2 className='font-title truncate text-xl sm:text-2xl'>
                {name}
              </h2>
              <p className='truncate text-sm'>{shortDescription}</p>
            </div>
          </NavLink>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
