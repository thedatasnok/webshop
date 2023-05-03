import clsx from 'clsx';
import React from 'react';

interface OnSalePillProps {
  className?: string;
}

const OnSalePill: React.FC<OnSalePillProps> = ({ className }) => {
  return (
    <span
      className={clsx(
        'bg-secondary-800/50 border-secondary-800 text-secondary-50 rounded-sm border px-0.5 text-xs',
        className
      )}
    >
      SALE
    </span>
  );
};

export default OnSalePill;
