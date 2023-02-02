import { Logo } from '@webshop/ui';
import clsx from 'clsx';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={clsx('max-w-screen-xl mx-auto mt-8', className)}>
      <div className='grid grid-cols-3 justify-items-center mb-4'>

        <div>
          <h2 className='mb-6 font-title font-semibold text-base-50 uppercase'>
            Shortcuts
          </h2>
          <ul className='text-base-400'>
            <li className='mb-2'>
              <a href='' className='hover:underline'>
                Home
              </a>
            </li>
            <li className='mb-2'>
              <a href='' className='hover:underline'>
                All products
              </a>
            </li>
            <li>
              <a href='' className='hover:underline'>
                More stuff
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className='mb-6 font-title font-semibold text-base-50 uppercase'>
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
          <h2 className='mb-6 font-title font-semibold text-base-50 uppercase'>
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
          <div className='w-full border-t border-base-600' />
        </div>
        <div className='relative flex justify-center'>
          <div className='w-32 px-4 bg-base'>
            <Logo variant='small' />
          </div>
        </div>
      </section>

      <p className='text-sm text-base-400 text-center my-2'>
        &copy; 2023 CGG&trade; Certain Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
