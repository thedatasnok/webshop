import clsx from 'clsx';
import {
  RiAlertLine,
  RiCheckboxCircleLine,
  RiCloseLine,
  RiInformationLine,
} from 'react-icons/ri';

export const enum AlertLevel {
  INFO,
  SUCCESS,
  WARNING,
  ERROR,
}

export interface AlertProps {
  level: AlertLevel;
  message: string;
  show?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  level,
  message,
  show,
  children,
  onClose,
}) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-2 rounded-sm border p-1.5 shadow-sm',
        !show && 'hidden',
        level === AlertLevel.INFO &&
          'bg-primary/10 border-primary-700 text-primary-600',
        level === AlertLevel.SUCCESS && 'bg-ok/10 border-ok text-ok-400',
        level === AlertLevel.WARNING && 'bg-warn/10 border-warn text-warn',
        level === AlertLevel.ERROR && 'bg-error/10 border-error text-error'
      )}
    >
      <AlertIcon level={level} className='h-5 w-5' />
      <span className='text-sm font-thin leading-tight'>{message}</span>
      {children}
      {onClose && <RiCloseLine onClick={onClose} className='ml-auto' />}
    </div>
  );
};

const AlertIcon: React.FC<{ level: AlertLevel; className?: string }> = ({
  level,
  className,
}) => {
  return (
    <>
      {level === AlertLevel.INFO && <RiInformationLine className={className} />}
      {level === AlertLevel.SUCCESS && (
        <RiCheckboxCircleLine className={className} />
      )}
      {level === AlertLevel.WARNING && <RiAlertLine className={className} />}
      {level === AlertLevel.ERROR && <RiAlertLine className={className} />}
    </>
  );
};

export default Alert;
