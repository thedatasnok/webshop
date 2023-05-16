import clsx from 'clsx';

interface CategoryCardProps {
  id: number;
  name: string;
  iconUrl: string;
  selected?: boolean;
  responsiveIcon?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  iconUrl,
  selected,
  responsiveIcon,
}) => {
  return (
    <div
      className={clsx(
        'border-base-800 bg-base-900/30 hover:border-primary-800 hover:text-primary-600 group flex aspect-square cursor-pointer',
        'relative flex-col items-center justify-center gap-2 rounded-sm border p-1 outline-none sm:p-2 sm:transition md:p-4',
        selected && 'text-primary  border-primary'
      )}
    >
      <div
        role='img'
        aria-labelledby={`category-${id}`}
        className={clsx(
          'bg-base-300 group-hover:bg-primary aspect-square transition',
          responsiveIcon ? 'w-10 sm:w-14 md:w-24' : 'w-24',
          selected && 'bg-primary'
        )}
        style={{
          WebkitMask: `url(${iconUrl}) no-repeat center`,
          mask: `url(${iconUrl}) no-repeat center`,
        }}
      />

      <span className='group-hover:text-primary font-title text-center text-sm font-semibold uppercase tracking-wide'>
        {name}
      </span>
    </div>
  );
};

export default CategoryCard;
