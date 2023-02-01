export interface ButtonProps {
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  const handleClick = () => {
    // TODO: Remove this placeholder logic :)
    console.log('Button clicked!');
  };

  return (
    <button onClick={handleClick} className='bg-primary-500 text-base-900 px-2 py-1'>
      {children}
    </button>
  );
};

export default Button;
