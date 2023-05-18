import { RouteHref } from '@/router';
import clsx from 'clsx';
import {
  RiHeadphoneLine,
  RiShoppingCartLine,
  RiStore2Line,
  RiUser3Line,
} from 'react-icons/ri';
import NavigationItem from './NavigationItem';
import { useCart } from '@/hooks/useCart';

interface NavigationBarProps {
  className?: string;
}

/**
 * Mobile navigation bar component, displayed at the bottom of the screen for mobile or small screens.
 */
const NavigationBar: React.FC<NavigationBarProps> = ({ className }) => {
  const { isEmpty, itemQuantity } = useCart();
  return (
    <nav
      className={clsx('bg-base-900 border-base-700 w-full border-t', className)}
    >
      <ul className='mx-auto grid grid-cols-4'>
        <li>
          <NavigationItem
            to={RouteHref.PRODUCTS}
            name='Browse'
            icon={RiStore2Line}
          />
        </li>
        <li>
          <NavigationItem
            to={RouteHref.SUPPORT}
            name='Support'
            icon={RiHeadphoneLine}
          />
        </li>
        <li className='relative'>
          <NavigationItem
            to={RouteHref.CART}
            name='Cart'
            icon={RiShoppingCartLine}
          />

          {!isEmpty && (
            <div className='bg-primary text-base-900 absolute left-1/2 top-0 ml-1 flex h-4 w-4 items-center justify-center rounded-full px-1 text-xs font-semibold'>
              {itemQuantity < 10 ? itemQuantity : '9+'}
            </div>
          )}
        </li>
        <li>
          <NavigationItem
            to={RouteHref.PROFILE}
            name='Profile'
            icon={RiUser3Line}
          />
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
