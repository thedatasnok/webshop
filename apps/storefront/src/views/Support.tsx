import PageLayout from '@/components/layout/PageLayout';
import { RiMailLine, RiPhoneLine, RiStore2Line } from 'react-icons/ri';

const Support = () => {
  return (
    <PageLayout>
      <main className='mx-auto flex max-w-screen-xl justify-center p-2'>
        <div className='border-base-800 border p-4'>
          <h1 className='font-title flex pb-2 text-2xl font-semibold uppercase'>
            Support
          </h1>

          <p className='max-w-screen-xl'>
            Cyberpunk gaming gear are dedicated to providing you with the best
            shopping experience possible, and that includes offering top-notch
            support for all of your inquiries. Whether you have a question about
            a product, need help with an order, or just want to give us some
            feedback, our customer support team is always available to assist
            you. You can reach us through both phone and email, whichever method
            is most convenient for you.
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
              href='mailto:support@cgg.no'
              className='hover:text-primary-400 flex gap-2 transition-colors'
            >
              <RiMailLine className='h-6 w-6' />
              <p>support@cgg.no</p>
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
        <section
          aria-label='storefront-image'
          className='border-base-800 hidden border lg:flex'
        >
          <img
            src='https://cdn.discordapp.com/attachments/1091009232498860134/1098196534849437816/dudleif_The_front_of_the_Cyberpunk_Gaming_Gear_store_at_night_i_46a20040-2b5b-4591-889d-7a03f5fb7ba5.jpg'
            className='border-base-800'
          />
        </section>
      </main>
    </PageLayout>
  );
};

export default Support;
