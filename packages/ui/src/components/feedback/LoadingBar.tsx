import clsx from 'clsx';
import React from 'react';

interface LoadingBarProps {
  /**
   * Whether the loading bar should be displayed or not.
   * If false, the loading bar will be invisible.
   */
  loading?: boolean;
  className?: string;
}

/**
 * Loading bar component that displays a loading bar when loading is true.
 * It will always occupy its required height, and fill to the width of the parent container.
 */
const LoadingBar: React.FC<LoadingBarProps> = ({ loading, className }) => {
  return (
    <div
      role='progressbar'
      className={clsx(
        'relative -mt-px h-0.5 w-full overflow-hidden',
        !loading && 'invisible',
        className
      )}
    >
      {/* Loading bar progress */}
      <div className='bg-primary-700 animate-loading-line absolute left-0 top-0 h-full w-40 transform' />
    </div>
  );
};

export default LoadingBar;
