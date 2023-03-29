import { useCart } from '@/hooks/useCart';
import { RouteHref } from '@/router';
import { Logo, useAuth } from '@webshop/ui';
import clsx from 'clsx';
import {
  RiDoorOpenLine,
  RiHeadphoneLine,
  RiShoppingCartLine,
  RiStore2Line,
  RiUser3Line,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import NavigationItem from '../navigation/NavigationItem';
import { SearchBar } from '../navigation/SearchBar';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { isLoggedIn } = useAuth();
  const { isEmpty, itemQuantity } = useCart();

  return (
    <header className={clsx('border-base-200', className)}>
      <nav className='mx-auto flex max-w-screen-xl flex-col gap-4 py-4 sm:flex-row sm:items-center'>
        <div className='flex justify-center'>
          <NavLink to={RouteHref.HOME} className='w-64 sm:w-44'>
            <Logo variant='big' />
          </NavLink>
        </div>

        <SearchBar />

        <ul className='hidden w-44 items-center justify-end gap-2 sm:flex'>
          <li>
            <NavigationItem
              to={RouteHref.PRODUCTS}
              name='Browse'
              icon={RiStore2Line}
              size='sm'
            />
          </li>
          <li>
            <NavigationItem
              to={RouteHref.SUPPORT}
              name='Support'
              icon={RiHeadphoneLine}
              size='sm'
            />
          </li>
          <li className='relative'>
            <NavigationItem
              to={RouteHref.CART}
              name='Cart'
              icon={RiShoppingCartLine}
              size='sm'
            />

            {!isEmpty && (
              <div className='bg-primary text-base-900 absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full px-1 text-xs font-semibold'>
                {itemQuantity < 10 ? itemQuantity : '9+'}
              </div>
            )}
          </li>
          {!isLoggedIn && (
            <li>
              <NavigationItem
                to={RouteHref.SIGN_IN}
                name='Sign in'
                icon={RiDoorOpenLine}
                size='sm'
              />
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavigationItem
                to={RouteHref.PROFILE}
                name='Profile'
                icon={RiUser3Line}
                size='sm'
              />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
