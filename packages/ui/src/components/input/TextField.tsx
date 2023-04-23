import clsx from 'clsx';
import type { IconType } from 'react-icons';

export interface TextFieldProps {
  id?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (value: string) => void;
  icon?: IconType;
  iconSide?: 'left' | 'right';
  type?: 'text' | 'password' | 'email';
  error?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  className,
  placeholder,
  value,
  inputProps,
  onChange,
  icon: Icon,
  iconSide = 'left',
  type = 'text',
  error = false,
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
        id={id}
        className={clsx(
          'border-base-600 w-full rounded-sm border bg-transparent p-2 focus:outline-none focus:ring-0',
          Icon && [
            iconSide === 'left' && 'pl-8',
            iconSide === 'right' && 'pr-8',
          ],
          !error && 'focus:border-primary',
          error && 'border-error focus:border-error',
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
