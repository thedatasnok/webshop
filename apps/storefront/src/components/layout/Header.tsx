import { Logo } from '@webshop/ui';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='border-base-200 px-12 py-2.5'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center gap-4  py-4'>
        <a className='flex items-center w-48'>
          <Logo variant='big' />
        </a>
        <div className='flex-1 border border-base-700 px-2 py-1 rounded-sm'>
          <input
            type='text'
            className='w-full bg-transparent focus:outline-none'
            placeholder='Search...'
            aria-label='Search'
          />
        </div>
        <div className='flex items-center lg:order-2 gap-2'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='w-6 aspect-square rounded-full bg-base-600 '
            />
          ))}
        </div>
      </div>

      <nav>
        <ul className='mx-auto flex max-w-screen-xl flex-wrap gap-2 text-cyan-50'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
            >
              Landing
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/products'
              end
              className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/products/1'
              className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
            >
              Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/cart'
              className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/auth/sign-in'
              className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
            >
              Sign-in
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/auth/sign-up'
              className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
            >
              Sign-up
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
