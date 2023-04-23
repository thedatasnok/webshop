import clsx from 'clsx';
import { IconType } from 'react-icons';

interface HintProps {
  message: string;
  icon: IconType;
  style?: 'regular' | 'warn' | 'error';
  className?: string;
}

/**
 * Simple hint component that displays an icon with a tooltip when hovering the icon.
 */
const Hint: React.FC<HintProps> = ({
  message,
  icon: Icon,
  style = 'regular',
  className,
}) => {
  return (
    <div className={clsx('group w-fit hover:z-10', className)}>
      <Icon
        className={clsx(
          'h-5 w-5',
          style === 'regular' && 'text-base-300',
          style === 'warn' && 'text-warn',
          style === 'error' && 'text-error'
        )}
      />

      <span
        role='tooltip'
        className={clsx(
          'bg-base-900 border-base-800 absolute left-1/2 top-full mt-1 hidden w-32 -translate-x-1/2 rounded-sm border px-2 py-1 text-sm font-medium group-hover:block',
          style === 'warn' && '',
          style === 'error' && ''
        )}
      >
        {message}
      </span>
    </div>
  );
};

export default Hint;
