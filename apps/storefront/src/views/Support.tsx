import PageLayout from '@/components/layout/PageLayout';
import { RiMailLine, RiPhoneLine, RiStore2Line } from 'react-icons/ri';

const Support = () => {
  return (
    <PageLayout className='mx-auto flex max-w-screen-xl justify-center gap-2 py-4'>
      <div className='flex-grow-0'>
        <h1 className='font-title flex pb-2 text-2xl font-semibold uppercase'>
          Support
        </h1>

        <p className='text-base-300'>
          Cyberpunk gaming gear are dedicated to providing you with the best
          shopping experience possible, and that includes offering top-notch
          support for all of your inquiries. Whether you have a question about a
          product, need help with an order, or just want to give us some
          feedback, our customer support team is always available to assist you.
          You can reach us through both phone and email, whichever method is
          most convenient for you.
        </p>

        <div className='flex flex-col gap-2 pt-8'>
          <a
            href='tel:4713371337'
            className='hover:text-primary-400 flex gap-2 transition-colors'
          >
            <RiPhoneLine className='h-6 w-6' />
            <p>+47 13371337</p>
          </a>

          <a
            href='mailto:noreply@datasnok.cool'
            className='hover:text-primary-400 flex gap-2 transition-colors'
          >
            <RiMailLine className='h-6 w-6' />
            <p>noreply@datasnok.cool</p>
          </a>

          <a
            href='https://goo.gl/maps/tqLrUkjo9FnoLowPA'
            target='_blank'
            className='hover:text-primary-400 flex gap-2 transition-colors'
          >
            <RiStore2Line className='h-6 w-6' />
            <p>Larsgårdsvegen 2, 6009 Ålesund</p>
          </a>
        </div>
      </div>

      <img
        alt='storefront'
        src='https://cgg-webshop-assets.s3.eu-north-1.amazonaws.com/images/branding/storefront-image.jpg'
        className='border-base-800 h-min w-1/2 flex-1 flex-shrink-0 rounded-sm border max-lg:hidden'
      />
    </PageLayout>
  );
};

export default Support;
