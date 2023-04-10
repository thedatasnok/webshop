import clsx from 'clsx';
import { RiLoader3Line } from 'react-icons/ri';

export interface ButtonProps {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  isLoading,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={clsx(
        'bg-primary text-base-900 font-title border-primary flex items-center justify-center rounded-sm border px-4 py-1 text-lg font-semibold uppercase outline-none',
        className
      )}
    >
      {isLoading ? (
        <RiLoader3Line className='h-5 w-5 animate-spin' />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
