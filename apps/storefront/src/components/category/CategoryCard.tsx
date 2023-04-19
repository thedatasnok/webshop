import clsx from 'clsx';

interface CategoryCardProps {
  id: number;
  name: string;
  iconUrl: string;
  selected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  iconUrl,
  selected,
}) => {
  return (
    <div
      className={clsx(
        'border-base-800 bg-base-900/30 hover:border-primary-800 hover:text-primary-600 group flex aspect-square cursor-pointer',
        'flex-col items-center justify-center gap-2 rounded-sm border p-4 outline-none sm:transition ',
        selected && 'text-primary  border-primary'
      )}
    >
      <div
        role='img'
        aria-labelledby={`category-${id}`}
        className={clsx(
          'bg-base-300 group-hover:bg-primary mx-auto aspect-square w-14 transition sm:w-24',
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
