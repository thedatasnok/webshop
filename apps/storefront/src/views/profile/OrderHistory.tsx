import clsx from 'clsx';
import { forwardRef } from 'react';

export interface OrderHistoryProps {
  className?: string;
}

const OrderHistory = forwardRef<HTMLDivElement, OrderHistoryProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={clsx(className)}>
        <h1 className='hidden md:block font-title mt-4 mb-2 text-3xl font-semibold uppercase'>
          Order History
        </h1>
        <div className='mt-4 md:mt-0 border-base-700 mb-4 flex-1 rounded-sm border px-2 py-1'>
          <input
            type='text'
            className='w-full border-0 bg-transparent p-0 outline-none focus:outline-none focus:ring-0'
            placeholder='Search...'
            aria-label='Search'
          />
        </div>
        <div className='mx-auto mt-4 flex flex-wrap justify-between'>
          <h2 className='font-title mb-2 text-xl font-semibold uppercase'>
            Order #1337
          </h2>
          <h2 className='font-title mb-2 text-xl font-semibold uppercase'>
            25.12.2020 13:50
          </h2>
        </div>
        <h3>Status: Delivered</h3>
        <section id=''>
          {[...Array(3)].map((_, i) => (
            <div className='flex py-2' key={i}>
              <div className='bg-base-800 h-24 w-48 rounded-sm' />
              <p className='px-4'>3D GAMING</p>
            </div>
          ))}
        </section>
        <h3 className='flex justify-end'>Total: $2,000,000</h3>
      </div>
    );
  }
);

export default OrderHistory;
