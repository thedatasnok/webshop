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
        'border-base-800 bg-base-800/10 sm:hover:border-primary group flex aspect-square cursor-pointer',
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
      <p className='group-hover:text-primary text-center text-sm font-medium'>
        {name}
      </p>
    </div>
  );
};

export default CategoryCard;
