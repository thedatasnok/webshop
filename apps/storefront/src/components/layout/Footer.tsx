import { RouteHref } from '@/router';
import { Logo } from '@webshop/ui';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={clsx('mx-auto mt-8 max-w-screen-xl', className)}>
      <div className='mb-4 grid grid-cols-3 justify-items-center'>
        <div>
          <h2 className='font-title text-base-50 mb-6 font-semibold uppercase'>
            Shortcuts
          </h2>
          <ul className='text-base-400'>
            <li className='mb-2'>
              <NavLink to={RouteHref.HOME} className='hover:underline'>
                Home
              </NavLink>
            </li>
            <li className='mb-2'>
              <NavLink to={RouteHref.PRODUCTS} className='hover:underline'>
                Browse
              </NavLink>
            </li>
            <li>
              <NavLink to={RouteHref.SUPPORT} className='hover:underline'>
                Support
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 className='font-title text-base-50 mb-6 font-semibold uppercase'>
            Opening times
          </h2>
          <ul className='text-base-400'>
            <li className='mb-2'>
              <a>Weekdays: 07:00 - 07:05</a>
            </li>
            <li className='mb-2'>
              <a>Weekends: 08:00 - 08:01</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className='font-title text-base-50 mb-6 font-semibold uppercase'>
            Contact info
          </h2>
          <ul className='text-base-400'>
            <li className='mb-2'>
              <a href='' className='hover:underline'>
                +47 13371337
              </a>
            </li>
            <li className='mb-2'>
              <a href='mailto:support@cgg.no' className='hover:underline'>
                support@cgg.no
              </a>
            </li>
          </ul>
        </div>
      </div>

      <section id='logo-divider' className='relative my-2'>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='border-base-600 w-full border-t' />
        </div>
        <div className='relative flex justify-center'>
          <div className='bg-base w-32 px-4'>
            <Logo variant='small' />
          </div>
        </div>
      </section>

      <p className='text-base-400 my-2 text-center text-sm'>
        &copy; 2023 CGG&trade; Certain Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
