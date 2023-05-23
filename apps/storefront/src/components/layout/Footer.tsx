import { RouteHref } from '@/router';
import { Logo } from '@webshop/ui';
import {
  RiHeadphoneLine,
  RiHome4Line,
  RiMailLine,
  RiPhoneLine,
  RiStore2Line,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className='mx-auto mt-12 w-full max-w-screen-xl'>
      <section
        id='sitelinks'
        className='grid grid-cols-1 justify-items-center text-center leading-8 sm:grid-cols-3'
      >
        <div className='mb-8'>
          <h2 className='font-title text-base-50 mb-4 text-xl font-semibold uppercase'>
            Shortcuts
          </h2>

          <ul className='text-base-400 flex flex-col max-sm:items-center'>
            <li>
              <NavLink
                to={RouteHref.HOME}
                className='group flex items-center gap-1'
              >
                <RiHome4Line className='h-5 w-5 max-sm:-ml-1' />
                <p className='group-hover:underline'>Home</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={RouteHref.PRODUCTS}
                className='group flex items-center gap-1'
              >
                <RiStore2Line className='h-5 w-5' />
                <p className='group-hover:underline'>Browse</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={RouteHref.SUPPORT}
                className='group flex items-center gap-1'
              >
                <RiHeadphoneLine className='h-5 w-5' />
                <p className='group-hover:underline'>Support</p>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className='mb-8'>
          <h2 className='font-title text-base-50 mb-4 text-xl font-semibold uppercase'>
            Opening times
          </h2>
          <ul className='text-base-400'>
            <li>Weekdays: 07:00 - 07:05</li>
            <li>Weekends: 08:00 - 08:01</li>
          </ul>
        </div>

        <div className='mb-8'>
          <h2 className='font-title text-base-50 mb-4 text-xl font-semibold uppercase'>
            Contact us
          </h2>

          <ul className='text-base-400 flex flex-col max-sm:items-center'>
            <li>
              <a
                href='tel:4713371337'
                className='group flex items-center gap-1'
              >
                <RiPhoneLine className='h-5 w-5' />
                <p className='group-hover:underline'>+47 13371337</p>
              </a>
            </li>

            <li>
              <a
                href='mailto:noreply@datasnok.cool'
                className='group flex items-center gap-1'
              >
                <RiMailLine className='h-5 w-5' />
                <p className='group-hover:underline'>noreply@datasnok.cool</p>
              </a>
            </li>
          </ul>
        </div>
      </section>

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

      <p className='text-base-400 mt-4 text-center text-sm'>
        &copy; 2023 CGG&trade; Certain Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
