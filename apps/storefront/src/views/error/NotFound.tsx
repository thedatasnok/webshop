import PageLayout from '@/components/layout/PageLayout';
import NavigationItem from '@/components/navigation/NavigationItem';
import { RiArrowGoBackFill } from 'react-icons/ri';

const NotFound = () => {
  return (
    <PageLayout>
      <main>
        <div className='flex h-96 flex-col items-center justify-center'>
          <h1 className='font-title flex text-8xl font-semibold'>404</h1>
          <p>could not find that page</p>
          <div className='py-4'>
            <NavigationItem to='/' name='go back' icon={RiArrowGoBackFill} />
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default NotFound;
