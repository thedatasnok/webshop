import clsx from 'clsx';
import { RiLoader3Line } from 'react-icons/ri';

export interface ButtonProps {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  style?: 'outline' | 'solid';
  variant?: 'primary' | 'destructive' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  className,
  style = 'solid',
  variant = 'primary',
  size = 'md',
  isLoading,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={() => onClick?.()}
      // an alternative to this would be to introduce something like cva (class-variance-authority)
      // the idea is to group styling by the style of the button and cover variants under them
      className={clsx(
        'font-title relative rounded-sm border uppercase outline-none transition-all',
        // outline variants
        style === 'outline' && [
          'hover:ring-1',
          variant === 'primary' &&
            'border-primary text-primary ring-primary/50 hover:bg-primary-900/20',
          variant === 'destructive' &&
            'border-error text-error ring-error/50 hover:bg-error-900/10',
          variant === 'neutral' &&
            'border-base-400 text-base-300 ring-base-400/50 hover:bg-base-400/10',
        ],
        // solid variants
        style === 'solid' && [
          'font-semibold',
          variant === 'primary' && 'bg-primary text-base-950 border-primary',
          variant === 'destructive' && 'text-base-50 bg-error-600 border-error',
          variant === 'neutral' &&
            'bg-base-900 border-base-800 hover:bg-base-800 hover:border-base-700',
        ],
        // sizes
        size === 'sm' && 'text-sm',
        size === 'lg' && 'text-lg',
        className
      )}
    >
      {/* Loading spinner, wrapped in a div to allow the spinner to spin independently of the translation to center it */}
      <div
        className={clsx(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          !isLoading && 'hidden'
        )}
      >
        <RiLoader3Line className='h-5 w-5 animate-spin' />
      </div>

      <div
        className={clsx(
          'flex h-full w-full items-center justify-center gap-1 px-3 py-1',
          // hide content in loading state
          isLoading && 'invisible'
        )}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
