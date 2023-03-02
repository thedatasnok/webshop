import clsx from 'clsx';

export interface ButtonProps {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={clsx('bg-primary-500 text-base-900 px-2 py-1', className)}
    >
      {children}
    </button>
  );
};

export default Button;
