import clsx from 'clsx';

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className }) => {
  const handleClick = () => {
    // TODO: Remove this placeholder logic :)
    console.log('Button clicked!');
  };

  return (
    <button
      onClick={handleClick}
      className={clsx('bg-primary-500 text-base-900 px-2 py-1', className)}
    >
      {children}
    </button>
  );
};

export default Button;
