interface InputLabelProps {
  children: React.ReactNode;
}

const InputLabel: React.FC<InputLabelProps> = ({ children }) => {
  return (
    <label className='font-title text-sm font-semibold uppercase'>
      {children}
    </label>
  );
};

export default InputLabel;
