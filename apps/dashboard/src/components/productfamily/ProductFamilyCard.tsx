import clsx from 'clsx';

interface ProductFamilyCardProps {
  id: number;
  name: string;
  description: string;
  productCount: number;
  selected?: boolean;
  onClick?: () => void;
}

const ProductFamilyCard: React.FC<ProductFamilyCardProps> = ({
  id,
  name,
  description,
  productCount,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'border-base-800 relative flex h-24 w-72 flex-shrink-0 cursor-pointer rounded-sm border p-1',
        selected && 'border-primary-800 bg-primary-900/20'
      )}
    >
      <div
        role='checkbox'
        className={clsx(
          'bg-base-700 ml-1 mr-2 h-2.5 w-2.5 flex-shrink-0 self-center rounded-full',
          selected && 'bg-primary-600 border-primary-800 border'
        )}
      />

      <div>
        <span className='font-title text-base-400 absolute bottom-0 right-1 text-xs'>
          #{id.toString().padStart(4, '0')}
        </span>
        <h3 className='font-title truncate text-lg font-semibold'>{name}</h3>
        <p className='text-base-300 line-clamp-2 text-sm'>{description}</p>
        <p className='text-base-400 truncate text-xs font-medium'>
          {productCount} products
        </p>
      </div>
    </div>
  );
};

export default ProductFamilyCard;
