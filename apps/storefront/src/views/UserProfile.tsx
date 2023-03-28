import PageLayout from '@/components/layout/PageLayout';
import OrderHistory from '@/views/profile/OrderHistory';
import UserDetails from '@/views/profile/UserDetails';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

const UserProfile = () => {
  return (
    <PageLayout>
      <main className='md:hidden'>
        <div>
          <Tab.Group>
            <Tab.List className='grid grid-cols-2'>
              <Tab as={Fragment}>
                <TabButton>Account details</TabButton>
              </Tab>
              <Tab as={Fragment}>
                <TabButton>Order history</TabButton>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <UserDetails />
              </Tab.Panel>
              <Tab.Panel>
                <OrderHistory />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

      <main className='mx-auto mt-4 hidden max-w-screen-xl gap-x-32 md:flex'>
        <UserDetails className='w-1/3' />
        <OrderHistory className='w-2/3' />
      </main>
    </PageLayout>
  );
};

interface TabButtonProps {
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ children }) => {
  return (
    <button className='ui-selected:border-primary border-base-50 text-base-50 border-b-2 outline-none'>
      {children}
    </button>
  );
};

export default UserProfile;
