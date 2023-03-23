import PageLayout from '@/components/layout/PageLayout';
import Button from '@webshop/ui/src/components/input/Button';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import UserDetails from '@/views/profile/UserDetails';
import OrderHistory from '@/views/profile/OrderHistory';

const UserProfile = () => {
  return (
    <PageLayout>
      <main className='md:hidden'>
        <div>
          <Tab.Group>
            <Tab.List className='grid grid-cols-2'>
              <Tab as={Fragment}>
                <button className='ui-selected:border-primary border-base-50 text-base-50 border-b-2 outline-none'>
                  Account details
                </button>
              </Tab>
              <Tab as={Fragment}>
                <button className='ui-selected:border-primary border-base-50 text-base-50 border-b-2 outline-none'>
                  Order history
                </button>
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

export default UserProfile;
