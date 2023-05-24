import clsx from 'clsx';
import { RiCheckLine } from 'react-icons/ri';

interface CategoryListCardProps {
  id: number;
  name: string;
  iconUrl: string;
  selected?: boolean;
  onClick?: () => void;
}

/**
 * List card used to display a category in a list format.
 */
const CategoryListCard: React.FC<CategoryListCardProps> = ({
  id,
  name,
  iconUrl,
  selected,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className={clsx(
        'border-base-800 group flex cursor-pointer items-center gap-1 rounded-sm border p-2',
        selected && 'border-primary-800 bg-primary-900/20'
      )}
    >
      <RiCheckLine className={clsx('h-5 w-5', !selected && 'invisible')} />

      <span
        id={`category-${id}`}
        className='font-title flex-1 font-semibold uppercase'
      >
        {name}
      </span>

      <div
        role='img'
        aria-labelledby={`category-${id}`}
        className={clsx(
          'bg-base-300 group-hover:bg-primary mx-auto aspect-square w-12',
          selected && 'bg-primary-700'
        )}
        style={{
          WebkitMask: `url(${iconUrl}) no-repeat center`,
          mask: `url(${iconUrl}) no-repeat center`,
        }}
      />
    </li>
  );
};

export default CategoryListCard;
