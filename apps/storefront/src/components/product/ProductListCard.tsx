import { NavLink } from 'react-router-dom';

interface ProductListCardProps {
  to: string;
  name: string;
  image?: string;
  children: React.ReactNode;
}

const ProductListCard: React.FC<ProductListCardProps> = ({
  to,
  name,
  image,
  children,
}) => {
  return (
    <div className='border-base-800 border-b-2 pb-1'>
      <div className='flex flex-col p-1 sm:flex-row'>
        <NavLink to={to} className='flex w-full flex-row'>
          <img src={image} className='aspect-square w-1/6 md:w-1/6'></img>
          <div className='flex max-h-full max-w-[260px] flex-col pl-2 sm:max-w-[240px]  lg:max-w-[540px]'>
            <h2 className='font-title overflow-hidden truncate text-ellipsis text-2xl font-bold uppercase'>
              {name}
            </h2>
            <p className='overflow-hidden truncate text-ellipsis'>
              {'short description here'}
            </p>
          </div>
        </NavLink>

        {children}
      </div>
    </div>
  );
};

export default ProductListCard;
