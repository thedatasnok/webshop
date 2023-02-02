import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='flex items-center justify-center'>
      <div className='flex items-center gap-2 font-title font-semibold text-lg'>
        <NavLink
          to='/'
          className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
        >
          Landing
        </NavLink>
        <NavLink
          to='/products'
          end
          className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
        >
          Products
        </NavLink>
        <NavLink
          to='/products/1'
          className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
        >
          Product
        </NavLink>
        <NavLink
          to='/cart'
          className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
        >
          Cart
        </NavLink>
        <NavLink
          to='/auth/sign-in'
          className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
        >
          Sign-in
        </NavLink>
        <NavLink
          to='/auth/sign-up'
          className={({ isActive }) => `${isActive ? 'text-primary' : ''}`}
        >
          Sign-up
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
