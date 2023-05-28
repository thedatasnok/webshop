import NoSearchResults from '@/components/feedback/NoSearchResults';
import PageTitle from '@/components/layout/PageTitle';
import { useFindOrdersQuery } from '@/services/orders';
import { Disclosure } from '@headlessui/react';
import { useDebouncedValue } from '@mantine/hooks';
import { Button, LoadingBar, TextField, formatPrice } from '@webshop/ui';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { RiArrowRightSLine, RiCloseLine, RiSearchLine } from 'react-icons/ri';
import { useSearchParams } from 'react-router-dom';

const OrderManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCustomerId = searchParams.get('customerId');

  const [productName, setProductName] = useState('');
  const [debouncedProductName] = useDebouncedValue(productName, 500);

  const { data: orders, isFetching } = useFindOrdersQuery({
    customerId: paramCustomerId ?? undefined,
    productName: debouncedProductName,
  });

  return (
    <div className='flex h-full flex-col overflow-y-auto px-4 py-4'>
      <PageTitle title='Orders' />

      <section className='my-2 flex items-center gap-2'>
        <TextField
          icon={RiSearchLine}
          placeholder='Product name'
          value={productName}
          onChange={setProductName}
        />

        {paramCustomerId && (
          <>
            <p className='font-title font-semibold uppercase'>
              Orders by customer with id: {paramCustomerId}
            </p>

            <Button
              onClick={() => setSearchParams({})} // clears the search params
              style='outline'
              variant='neutral'
              className='text-xs'
            >
              <RiCloseLine className='-ml-1.5 h-4 w-4' />
              <span className='pt-px'>Clear customer id</span>
            </Button>
          </>
        )}
      </section>

      <div role='table' className='grid grid-cols-7 items-center'>
        <div role='row' className='grid-cols-inherit col-span-7 grid'>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b pl-1 text-lg font-semibold uppercase'
          >
            Id
          </h2>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b text-lg font-semibold uppercase'
          >
            Customer
          </h2>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b text-center text-lg font-semibold uppercase'
          >
            Total price
          </h2>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b text-center text-lg font-semibold uppercase'
          >
            Order lines
          </h2>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b text-center text-lg font-semibold uppercase'
          >
            Status
          </h2>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b text-center text-lg font-semibold uppercase'
          >
            Payment status
          </h2>
          <h2
            role='columnheader'
            className='border-base-700 preserve-line border-b text-lg'
          >
            {/* shows only for screen readers */}
            <span className='sr-only'>Actions</span>
          </h2>
        </div>

        <LoadingBar loading={isFetching} className='col-span-7' />

        {!isFetching && orders?.length === 0 && (
          <NoSearchResults text='No products found' className='col-span-7' />
        )}

        {orders?.map((order, idx, array) => (
          <div
            role='row'
            key={order.id}
            className={clsx(
              'grid-cols-inherit col-span-7 grid items-center p-1',
              array.length - 1 !== idx && 'border-base-800 border-b'
            )}
          >
            <span role='cell' className='font-title px-1 text-left font-medium'>
              #{order.id.toString().padStart(4, '0')}
            </span>

            <div role='cell' className='text-left'>
              <span className='block font-medium'>{order.customerName}</span>
              <a
                href={'mailto:'.concat(order.customerEmail)}
                className='text-base-300 hover:text-primary block text-sm transition-colors hover:underline'
              >
                {order.customerEmail}
              </a>
            </div>

            <span role='cell' className='font-title text-center'>
              {formatPrice(order.total)}
            </span>

            <span role='cell' className='font-title text-center'>
              {order.lines.length}
            </span>

            <span role='cell' className='font-title text-center'>
              {order.status}
            </span>

            <span role='cell' className='font-title text-center'>
              {order.paymentStatus}
            </span>

            <div role='cell' className='flex items-center justify-end gap-2'>
              <Button variant='neutral' size='sm'>
                View details
              </Button>
              <Button variant='destructive' size='sm'>
                Cancel
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
