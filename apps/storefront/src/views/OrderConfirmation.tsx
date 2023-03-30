import PageLayout from '@/components/layout/PageLayout';
import { RouteHref } from '@/router';
import { Button } from '@webshop/ui';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <PageLayout>
      <main>
        <div className='mx-auto w-full max-w-screen-xl text-center'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='font-title text-4xl font-bold'>
              Thank you for shopping!
            </h1>
            <p className='text-base-400 text-2xl font-semibold'>Order #25521</p>
            <RiCheckboxCircleLine className='text-primary h-2/6 w-2/6 sm:h-1/6 sm:w-1/6'></RiCheckboxCircleLine>
            <p>You will receive an email confirmation shortly.</p>
            <NavLink to={RouteHref.PROFILE}>
              <Button className='mt-4'>View order</Button>
            </NavLink>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default OrderConfirmation;
