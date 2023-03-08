import clsx from 'clsx';
import type { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

/**
 * Common props for the navigation item.
 */
interface BaseNavigationItemProps {
  name: string;
  icon: IconType;
  size?: 'sm' | 'md';
}

/**
 * Props for the link variant of the navigation item.
 */
interface LinkNavigationItemProps extends BaseNavigationItemProps {
  type?: 'link';
  to: string;
}

/**
 * Props for the button variant of the navigation item.
 */
interface ButtonNavigationItemProps extends BaseNavigationItemProps {
  type?: 'button';
  onClick: () => void;
}

type NavigationItemProps = LinkNavigationItemProps | ButtonNavigationItemProps;

/**
 * Shared components for the link and button variants of the navigation item.
 * Is only used internally by this component.
 */
interface LinkComponentProps {
  className: string;
  children: React.ReactNode;
}

const LinkNavigationItem: React.FC<
  LinkNavigationItemProps & LinkComponentProps
> = ({ className, children, to, size }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          className,
          isActive && 'text-primary',
          size === 'sm' && 'gap-0.5',
          size === 'md' && 'px-2'
        )
      }
    >
      {children}
    </NavLink>
  );
};

const ButtonNavigationItem: React.FC<
  ButtonNavigationItemProps & LinkComponentProps
> = ({ className, children, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const NavigationItem: React.FC<NavigationItemProps> = (props) => {
  const {
    type = 'link',
    name,
    icon: Icon,
    size = 'md', // defaults to md, which is used for mobile devices
  } = props;

  const LinkComponent =
    type === 'link' ? LinkNavigationItem : ButtonNavigationItem;

  return (
    <LinkComponent
      {...(props as any)} // hacky any cast, but the emitted types are correct
      className='flex flex-col items-center justify-center gap-1 py-2'
    >
      <Icon
        className={clsx(size === 'sm' && 'h-4 w-4', size === 'md' && 'h-6 w-6')}
      />
      <p className='font-title text-xs uppercase'>{name}</p>
    </LinkComponent>
  );
};

export default NavigationItem;
