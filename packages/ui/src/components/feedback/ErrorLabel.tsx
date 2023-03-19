import clsx from 'clsx';

export interface ErrorLabelProps {
  text?: string;
}

const ErrorLabel: React.FC<ErrorLabelProps> = ({ text }) => {
  return (
    <strong role='alert' className={clsx('text-error', !text && 'hidden')}>
      {text}
    </strong>
  );
};

export default ErrorLabel;
