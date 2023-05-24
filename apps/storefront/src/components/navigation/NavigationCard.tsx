import { RouteHref } from '@/router';
import { IconType } from 'react-icons';
import { RiArrowRightLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

interface NavigationCardProps {
  title: string;
  icon: IconType;
}

/**
 * Card used to navigate to a different page, like at the end of featured & related products.
 * Accepts a title and an icon that will be displayed on the card.
 */
const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  icon: Icon,
}) => {
  return (
    <li className='flex'>
      <NavLink
        to={RouteHref.PRODUCTS}
        className='border-base-800 bg-base-900/30 hover:bg-primary-900/10 hover:text-primary-600 hover:border-primary-800 flex w-48 flex-col items-center justify-center rounded-sm border'
      >
        <Icon className='h-16 w-16' />

        <div className='flex items-center'>
          <span className='font-title font-semibold uppercase'>{title}</span>
          <RiArrowRightLine className='h-5 w-5' />
        </div>
      </NavLink>
    </li>
  );
};

export default NavigationCard;
