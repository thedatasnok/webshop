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
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
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
    <NavLink
      to={to}
      className={clsx('border-base-700 block border-2 p-1', className)}
    >
      <img src={image} alt={name} className='aspect-square w-full' />
      <h2 className='font-title text-xl font-bold uppercase'>{name}</h2>
      <p className='pb-2 text-xs'>{shortDescription}</p>

      <section aria-label='product-pricing' className='flex'>
        <h3
          className={clsx({
            'text-primary-200 text-xl': isDiscount,
          })}
        >
          ${price}
        </h3>
        {isDiscount && (
          <div className='text-base-400 ml-1 mt-1 line-through'>
            ${previousPrice}
          </div>
        )}
      </section>
    </NavLink>
  );
};

export default ProductCard;
