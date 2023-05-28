import clsx from 'clsx';
import { RiSearchLine } from 'react-icons/ri';

export interface NoSearchResultsProps {
  text: string;
  className?: string;
}

/**
 * Component for displaying a message when no search results are found.
 */
const NoSearchResults: React.FC<NoSearchResultsProps> = ({
  text,
  className,
}) => {
  return (
    <div
      className={clsx(
        'text-base-400 flex flex-col items-center justify-center py-4',
        className
      )}
    >
      <RiSearchLine className='h-16 w-16' />
      <p className='font-title text-sm font-semibold uppercase'>{text}</p>
    </div>
  );
};

export default NoSearchResults;
