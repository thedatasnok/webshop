import { Button } from '@webshop/ui';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

interface ProductCardProps {
  to: string;
  name: string;
  price: string;
  image?: string;
  size?: 'sm' | 'md';
}

const ProductCard: React.FC<ProductCardProps> = ({
  to,
  name,
  price,
  image = 'https://placehold.co/256x256/007676/007676.png',
  size = 'md',
}) => {
  return (
    <NavLink to={to} className={clsx('text-base-50')}>
      <div className={clsx('border-base-700 border-2 p-1')}>
        <img src={image} className='aspect-square w-full'></img>
        <h2 className={clsx('font-title mb-2 text-xl font-bold uppercase')}>
          {name}
        </h2>
        <div className={clsx('flex items-center justify-between')}>
          <h3>{price}</h3>
          <Button>Buy</Button>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
