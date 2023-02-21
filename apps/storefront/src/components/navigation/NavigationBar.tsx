import {
  RiComputerLine,
  RiHeadphoneLine,
  RiShoppingCartLine,
  RiUser3Line,
} from 'react-icons/ri';
import NavigationItem from './NavigationItem';

const NavBar = () => {
  return (
    <nav className='bg-base-900 border-base-700 sticky bottom-0 z-10 w-full border-t sm:hidden'>
      <ul className='mx-auto flex w-2/3 items-center justify-between py-2'>
        <li>
          <NavigationItem
            to='/products'
            name='Products'
            icon={RiComputerLine}
          />
        </li>
        <li>
          <NavigationItem to='/support' name='Support' icon={RiHeadphoneLine} />
        </li>
        <li>
          <NavigationItem to='/profile' name='Profile' icon={RiUser3Line} />
        </li>
        <li>
          <NavigationItem to='/cart' name='Cart' icon={RiShoppingCartLine} />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
