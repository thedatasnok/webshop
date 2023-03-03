import clsx from 'clsx';
import type { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

interface NavigationItemProps {
  to: string;
  name: string;
  icon: IconType;
  size?: 'sm' | 'md';
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  to,
  name,
  icon: Icon,
  size = 'md', // defaults to md, which is used for mobile devices
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'flex flex-col items-center justify-center gap-1 py-2',
          isActive && 'text-primary',
          size === 'sm' && 'gap-0.5',
          size === 'md' && 'px-2'
        )
      }
    >
      <Icon
        className={clsx(size === 'sm' && 'h-4 w-4', size === 'md' && 'h-6 w-6')}
      />
      <p className='font-title text-xs uppercase'>{name}</p>
    </NavLink>
  );
};

export default NavigationItem;
