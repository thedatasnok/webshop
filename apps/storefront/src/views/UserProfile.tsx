import PageLayout from '@/components/layout/PageLayout';
import OrderHistory from '@/views/profile/OrderHistory';
import UserDetails from '@/views/profile/UserDetails';
import { Tab } from '@headlessui/react';

const UserProfile = () => {
  return (
    <PageLayout>
      <div className='md:hidden'>
        <Tab.Group>
          <Tab.List className='grid grid-cols-2'>
            <TabButton>Account details</TabButton>
            <TabButton>Order history</TabButton>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel as={UserDetails} />
            <Tab.Panel as={OrderHistory} />
          </Tab.Panels>
        </Tab.Group>
      </div>

      <div className='mx-auto mt-4 hidden max-w-screen-xl gap-x-32 md:flex'>
        <UserDetails className='w-1/3' />
        <OrderHistory className='w-2/3' />
      </div>
    </PageLayout>
  );
};

interface TabButtonProps {
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ children }) => {
  return (
    <Tab className='ui-selected:border-primary border-base-500 text-base-50 font-title border-b-2 text-lg font-semibold uppercase outline-none'>
      {children}
    </Tab>
  );
};

export default UserProfile;
