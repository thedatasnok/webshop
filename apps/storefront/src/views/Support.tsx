import PageLayout from '@/components/layout/PageLayout';
import { RiAccountCircleLine, RiMailLine, RiPhoneLine } from 'react-icons/ri';

const Support = () => {
  return (
    <PageLayout>
      <main>
        <div className='flex h-96 flex-col items-center'>
          <p className='mt-16 max-w-xl text-center'>
            Cyberpunk gaming gear are dedicated to providing you with the best
            shopping experience possible, and that includes offering top-notch
            support for all of your inquiries. Whether you have a question about
            a product, need help with an order, or just want to give us some
            feedback, our customer support team is always available to assist
            you. You can reach us through both phone and email, whichever method
            is most convenient for you.
          </p>

          <div className='flex flex-row gap-8 py-4'>
            <a href='tel: 4713371337' className='flex flex-col items-center'>
              <RiPhoneLine className='h-16 w-16' />
              <p>+47 13371337</p>
            </a>

            <a
              href='mailto: support@cgg.no'
              className='flex flex-col items-center'
            >
              <RiMailLine className='h-16 w-16' />
              <p>support@cgg.no</p>
            </a>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Support;
