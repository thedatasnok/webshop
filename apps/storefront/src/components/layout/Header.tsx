import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { RouteHref } from '@/router';
import { useSignOutMutation } from '@/services/auth';
import { Logo } from '@webshop/ui';
import clsx from 'clsx';
import {
  RiDoorOpenLine,
  RiHeadphoneLine,
  RiShoppingCartLine,
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
  const [signOut] = useSignOutMutation();
  const { items } = useCart();

  const cartItems = Object.values(items).reduce((acc, item) => acc + item, 0);

  return (
    <header className={clsx('border-base-200', className)}>
      <div className='mx-auto flex max-w-screen-xl flex-col gap-4 py-4 sm:flex-row sm:items-center'>
        <div className='flex justify-center'>
          <NavLink to={RouteHref.HOME} className='w-64 sm:w-44'>
            <Logo variant='big' />
          </NavLink>
        </div>

        <SearchBar />

        <ul className='hidden w-44 items-center justify-end gap-2 sm:flex'>
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

            {cartItems > 0 && (
              <div className='bg-primary text-base-900 absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full px-1 text-xs font-semibold'>
                {cartItems < 10 ? cartItems : '9+'}
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
            <>
              <li>
                <NavigationItem
                  to={RouteHref.PROFILE}
                  name='Profile'
                  icon={RiUser3Line}
                  size='sm'
                />
              </li>
              <li>
                <NavigationItem
                  type='button'
                  onClick={signOut}
                  name='Sign out'
                  icon={RiDoorOpenLine}
                  size='sm'
                />
              </li>
            </>
          )}
        </ul>
      </div>

      <nav>
        <div className='hidden sm:block'>
          <ul className='mx-auto flex max-w-screen-xl flex-wrap gap-2 text-cyan-50'>
            <li>
              <NavLink
                to={RouteHref.HOME}
                className={({ isActive }) =>
                  `${isActive ? 'text-primary' : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={RouteHref.PRODUCTS}
                end
                className={({ isActive }) =>
                  `${isActive ? 'text-primary' : ''}`
                }
              >
                Browse
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
