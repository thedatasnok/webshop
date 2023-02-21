import clsx from 'clsx';
import { useMemo } from 'react';

// there is probably a better name for this
// essentially the sides
export type CornerSides =
  | 'all'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type CornerSize = 'sm' | 'md';

export interface CornerProps {
  sides: CornerSides;
  size?: CornerSize;
  className?: string;
}

/**
 * Map of corner size to the percentage of the SVG each line should cover.
 */
const SIZE_MAP: { [k: string]: number } = {
  sm: 5,
  md: 15,
};

/**
 * Component for rendering a corner decoration.
 * Uses SVG to render lines based off the size of the parent element.
 * Makes a box with a 1:1 aspect ratio, even if the parent is not a square.
 * To circumvent this, use two or more instances and transform them.
 */
const Corner: React.FC<CornerProps> = ({ sides, size = 'sm', className }) => {
  /**
   * Calculates the lower and upper bounds of the SVG lines.
   * The lower bound is a percentage value of the SVG width/height. (0-100)
   * This is possible due to the SVG viewBox being 0-100.
   */
  const [lower, upper] = useMemo(() => {
    const lower = SIZE_MAP[size];
    const upper = 100 - lower;

    return [lower, upper];
  }, [size]);

  /**
   * Map of display conditions for each corner.
   */
  const displayConditions = {
    TOP_LEFT: ['top-left', 'top', 'left', 'all'].includes(sides),
    TOP_RIGHT: ['top-right', 'top', 'right', 'all'].includes(sides),
    BOTTOM_LEFT: ['bottom-left', 'bottom', 'left', 'all'].includes(sides),
    BOTTOM_RIGHT: ['bottom-right', 'bottom', 'right', 'all'].includes(sides),
  };

  return (
    <svg
      aria-hidden
      viewBox='0 0 100 100'
      className={clsx('pointer-events-none h-full', className)}
    >
      {displayConditions.TOP_LEFT && (
        <path
          d={`M${lower},0 L0,0 L0,${lower}`}
          fill='none'
          stroke='currentColor'
        />
      )}
      {displayConditions.BOTTOM_LEFT && (
        <path
          d={`M0,${upper} L0,100 L${lower},100`}
          fill='none'
          stroke='currentColor'
        />
      )}
      {displayConditions.BOTTOM_RIGHT && (
        <path
          d={`M${upper},100 L100,100 L100,${upper}`}
          fill='none'
          stroke='currentColor'
        />
      )}
      {displayConditions.TOP_RIGHT && (
        <path
          d={`M100,${lower} L100,0 L${upper},0`}
          fill='none'
          stroke='currentColor'
        />
      )}
    </svg>
  );
};

export default Corner;
