import clsx from 'clsx';
import type { IconType } from 'react-icons';

export interface TextFieldProps {
  className?: string;
  placeholder?: string;
  value?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (value: string) => void;
  icon?: IconType;
  iconSide?: 'left' | 'right';
  type?: 'text' | 'password' | 'email';
}

const TextField: React.FC<TextFieldProps> = ({
  className,
  placeholder,
  value,
  inputProps,
  onChange,
  icon: Icon,
  iconSide = 'left',
  type = 'text',
}) => {
  const emitUpdate = (value: string) => {
    onChange?.(value);
  };

  return (
    <div className='relative'>
      {Icon && (
        <Icon
          className={clsx(
            'pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2',
            iconSide === 'left' && 'left-2',
            iconSide === 'right' && 'right-2'
          )}
        />
      )}
      <input
        {...inputProps}
        className={clsx(
          'border-primary-50 focus:border-primary w-full rounded-sm border bg-transparent p-2 outline-none',
          Icon && [
            iconSide === 'left' && 'pl-8',
            iconSide === 'right' && 'pr-8',
          ],
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={(event) => emitUpdate(event.target.value)}
        type={type}
      />
    </div>
  );
};

export default TextField;
