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
                {({ selected }) => (
                  <Button className={selected ? 'border-b-2 border-primary text-base-50 bg-base-900' : 'border-b-2 border-base-50 text-base-50 bg-base-900'}>Account details</Button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <Button className={selected ? 'border-b-2 border-primary text-base-50 bg-base-900' : 'border-b-2 border-base-50 text-base-50 bg-base-900'}>Order history</Button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel as={UserDetails} />
              <Tab.Panel as={OrderHistory} />
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

      <main className='hidden mx-auto mt-4 max-w-screen-xl md:flex gap-x-32'>
        <div className='w-1/3'>
          <UserDetails />
        </div>
        <div className='w-2/3'>
          <OrderHistory />
        </div>
      </main>
    </PageLayout>
  );
};

export default UserProfile;
