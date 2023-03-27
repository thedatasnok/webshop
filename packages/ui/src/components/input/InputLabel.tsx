interface InputLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
}

const InputLabel: React.FC<InputLabelProps> = ({ children, htmlFor }) => {
  return (
    <label
      className='font-title select-none text-sm font-semibold uppercase'
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default InputLabel;
