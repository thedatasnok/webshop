import { RouteHref } from '@/router';
import { Logo } from '@webshop/ui';
import clsx from 'clsx';
import {
  RiHeadphoneLine,
  RiHome4Line,
  RiMailLine,
  RiPhoneLine,
  RiStore2Line,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={clsx('mx-auto mt-12 max-w-screen-xl', className)}>
      <div className='grid grid-cols-1 justify-items-center text-center leading-8 sm:grid-cols-3'>
        <div className='mb-8'>
          <h2 className='font-title text-base-50 mb-4 text-xl font-semibold uppercase'>
            Shortcuts
          </h2>
          <ul className='text-base-400'>
            <li>
              <NavLink to={RouteHref.HOME}>
                <div className='flex items-center gap-1'>
                  <RiHome4Line className='h-5 w-5'></RiHome4Line>
                  <p className='hover:underline'>Home</p>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink to={RouteHref.PRODUCTS}>
                <div className='flex items-center gap-1'>
                  <RiStore2Line className='h-5 w-5'></RiStore2Line>
                  <p className='hover:underline'>Browse</p>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink to={RouteHref.SUPPORT}>
                <div className='flex items-center gap-1'>
                  <RiHeadphoneLine className='h-5 w-5'></RiHeadphoneLine>
                  <p className='hover:underline'>Support</p>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className='mb-8'>
          <h2 className='font-title text-base-50 mb-4 text-xl font-semibold uppercase'>
            Opening times
          </h2>
          <ul className='text-base-400'>
            <li>
              <a>Weekdays: 07:00 - 07:05</a>
            </li>
            <li>
              <a>Weekends: 08:00 - 08:01</a>
            </li>
          </ul>
        </div>

        <div className='mb-8'>
          <h2 className='font-title text-base-50 mb-4 text-xl font-semibold uppercase'>
            Contact us
          </h2>
          <ul className='text-base-400'>
            <li>
              <a href='tel: 4713371337'>
                <div className='flex items-center gap-1'>
                  <RiPhoneLine className='h-5 w-5'></RiPhoneLine>
                  <p className='hover:underline'>+47 13371337</p>
                </div>
              </a>
            </li>

            <li>
              <a href='mailto: support@cgg.no'>
                <div className='flex items-center gap-1'>
                  <RiMailLine className='h-5 w-5'></RiMailLine>
                  <p className='hover:underline'>support@cgg.no</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <section id='logo-divider' className='relative my-2'>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='border-base-800 w-full border-t' />
        </div>
        <div className='relative flex justify-center'>
          <div className='bg-base-950 w-32 px-4'>
            <Logo variant='small' />
          </div>
        </div>
      </section>

      <p className='text-base-400 my-4 text-center text-sm'>
        &copy; 2023 CGG&trade; Certain Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
