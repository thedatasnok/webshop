import clsx from 'clsx';

export interface TextFieldProps {
  className?: string;
  placeholder?: string;
  value?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (value: string) => void;
  type?: 'text' | 'password';
}

const TextField: React.FC<TextFieldProps> = ({
  className,
  placeholder,
  value,
  inputProps,
  onChange,
  type = 'text',
}) => {
  const emitUpdate = (value: string) => {
    onChange?.(value);
  };

  return (
    <input
      {...inputProps}
      className={clsx(
        'w-full p-2 border border-primary-50 outline-none rounded-sm bg-transparent focus:border-primary',
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={(event) => emitUpdate(event.target.value)}
      type={type}
    ></input>
  );
};

export default TextField;
