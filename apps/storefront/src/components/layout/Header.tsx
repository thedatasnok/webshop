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
  return (
    <header className={clsx('border-base-200', className)}>
      <div className='mx-auto flex max-w-screen-xl flex-col gap-4 py-4 sm:flex-row sm:items-center'>
        <div className='flex justify-center'>
          <NavLink to='/' className='w-64 sm:w-44'>
            <Logo variant='big' />
          </NavLink>
        </div>

        <SearchBar />

        <ul className='hidden w-44 items-center justify-end gap-2 sm:flex'>
          <li>
            <NavigationItem
              to='/support'
              name='Support'
              icon={RiHeadphoneLine}
              size='sm'
            />
          </li>
          <li>
            <NavigationItem
              to='/profile'
              name='Profile'
              icon={RiUser3Line}
              size='sm'
            />
          </li>
          <li>
            <NavigationItem
              to='/cart'
              name='Cart'
              icon={RiShoppingCartLine}
              size='sm'
            />
          </li>
          <li>
            <NavigationItem
              to='/sign-out'
              name='Sign out'
              icon={RiDoorOpenLine}
              size='sm'
            />
          </li>
        </ul>
      </div>

      <nav>
        <div className='hidden sm:block'>
          <ul className='mx-auto flex max-w-screen-xl flex-wrap gap-2 text-cyan-50'>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `${isActive ? 'text-primary' : ''}`
                }
              >
                Landing
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/products'
                end
                className={({ isActive }) =>
                  `${isActive ? 'text-primary' : ''}`
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/products/1'
                className={({ isActive }) =>
                  `${isActive ? 'text-primary' : ''}`
                }
              >
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/auth/sign-in'
                className={({ isActive }) =>
                  `${isActive ? 'text-primary' : ''}`
                }
              >
                Sign-in
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/auth/sign-up'
                className={({ isActive }) =>
                  `${isActive ? 'text-primary' : ''}`
                }
              >
                Sign-up
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/checkout'
                className={({ isActive }) =>
                  `${isActive ? 'text-primary' : ''}`
                }
              >
                Checkout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
