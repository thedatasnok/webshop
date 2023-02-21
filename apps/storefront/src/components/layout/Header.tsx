import { Logo } from '@webshop/ui';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={clsx('border-base-200 px-12 py-2.5', className)}>
      <div className='mx-auto flex max-w-screen-xl flex-col gap-4 py-4  sm:flex-row'>
        <div className='flex justify-center'>
          <NavLink to='/' className='w-64 sm:w-48'>
            <Logo variant='big' />
          </NavLink>
        </div>
        <div className='border-base-700 flex-1 rounded-sm border px-2 py-1'>
          <input
            type='text'
            className='w-full bg-transparent focus:outline-none'
            placeholder='Search...'
            aria-label='Search'
          />
        </div>
        <div className='hidden sm:block'>
          <div className='flex items-center gap-2 lg:order-2'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='bg-base-600 aspect-square w-6 rounded-full '
              />
            ))}
          </div>
        </div>
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
                to='/cart'
                className={({ isActive }) =>
                  `${isActive ? 'text-primary' : ''}`
                }
              >
                Cart
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
            <li>
              <NavLink
                to='/profile'
                className={({ isActive }) =>
                  `${isActive ? 'text-primary' : ''}`
                }
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
