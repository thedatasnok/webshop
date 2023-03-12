import clsx from 'clsx';
import {
  RiComputerLine,
  RiHeadphoneLine,
  RiShoppingCartLine,
  RiUser3Line,
} from 'react-icons/ri';
import NavigationItem from './NavigationItem';

interface NavigationBarProps {
  className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ className }) => {
  return (
    <nav
      className={clsx('bg-base-900 border-base-700 w-full border-t', className)}
    >
      <ul className='mx-auto grid grid-cols-4'>
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

export default NavigationBar;
