import clsx from 'clsx';

export interface TextFieldProps {
  className?: string;
  placeholder?: string;
  value?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (value: string) => void;
  type?: 'text' | 'password' | 'email';
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
        'border-primary-50 focus:border-primary w-full rounded-sm border bg-transparent p-2 outline-none',
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={(event) => emitUpdate(event.target.value)}
      type={type}
    />
  );
};

export default TextField;
