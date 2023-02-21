import { NavLink } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

const NavBar = () => {
  return (
    <nav className='bg-base-900 sticky bottom-0 z-10 mx-auto flex w-full max-w-screen-xl flex-col border border-y-0 border-x-0 border-t-2 sm:hidden'>
      <div className='container mx-auto flex items-center justify-center'>
        <ul className='mx-auto flex max-w-screen-xl items-center justify-center'>
          <li>
            <NavLink
              to='/products'
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'ri-computer-line ri-fw text-primary flex flex-wrap items-center justify-center py-4 px-12'
                    : 'ri-computer-line ri-fw flex flex-wrap items-center justify-center py-4 px-12'
                }`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'ri-user-3-line ri-fw text-primary flex-grow-1 flex flex-wrap items-center justify-center py-4 px-12'
                    : 'ri-user-3-line ri-fw flex flex-wrap items-center justify-center py-4 px-12'
                }`
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/cart'
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'ri-shopping-cart-line ri-fw text-primary flex flex-wrap items-center justify-center py-4 px-12'
                    : 'ri-shopping-cart-line ri-fw flex flex-wrap items-center justify-center py-4 px-12'
                }`
              }
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
