import ProductListCard from '@/components/product/ProductListCard';
import { useFindOrdersQuery } from '@/services/userContextOrders';
import { Disclosure } from '@headlessui/react';
import { OrderDetails } from '@webshop/contracts';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

export interface OrderHistoryProps {
  className?: string;
}

interface OrderCardProps {
  order: OrderDetails;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <Disclosure>
      <Disclosure.Button className='bg-base-800 font-title ui-open:border-primary flex items-center rounded-sm border-b-2 px-2 py-2 text-xl font-semibold uppercase'>
        <RiArrowRightSLine className='ui-open:rotate-90 ui-open:transform' />
        <div className='flex w-full justify-between pl-1'>
          <p>Order #{order.id}</p>
          <p>{order.paymentStatus}</p>
          <p>{order.orderedAt.toString().substring(0, 10)}</p>
        </div>
      </Disclosure.Button>
      <Disclosure.Panel className='px-4 py-2'>
        <section>
          {order.lines.map((line) => (
            <div key={line.productId}>
              <ProductListCard
                to={'/products/' + line.productId}
                name={line.productName}
                shortDescription={line.productShortDescription}
                image={line.productImageUrls[0]}
                children={undefined}
              ></ProductListCard>
              <p className='mt-2 flex justify-end'>Price: ${line.subtotal}</p>
            </div>
          ))}
        </section>
      </Disclosure.Panel>
    </Disclosure>
  );
};

const OrderHistory = forwardRef<HTMLDivElement, OrderHistoryProps>(
  ({ className }, ref) => {
    const { data: orders } = useFindOrdersQuery();

    return (
      <div ref={ref} className={clsx(className)}>
        <h1 className='font-title hidden mb-2 text-2xl font-semibold uppercase md:block'>
          Order History
        </h1>
        <div className='border-base-700 mb-4 mt-4 flex-1 rounded-sm border px-2 py-1 md:mt-0'>
          <input
            type='text'
            className='w-full border-0 bg-transparent p-0 outline-none focus:outline-none focus:ring-0'
            placeholder='Search...'
            aria-label='Search'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Disclosure>
            <Disclosure.Button className='bg-base-800 font-title ui-open:border-primary flex items-center rounded-sm border-b-2 px-2 py-2 text-xl font-semibold uppercase'>
              <RiArrowRightSLine className='ui-open:rotate-90 ui-open:transform' />
              <div className='flex w-full justify-between pl-1'>
                <p>Order #1337</p>
                <p>In progress</p>
                <p>25.12.2020 13:50</p>
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className='px-4 py-2'>
              <section id=''>
                {[...Array(2)].map((_, i) => (
                  <ProductListCard
                    key='1'
                    to={'/products/' + 1}
                    name='3d rgb printer'
                    shortDescription='cool rgb printer with 3d lights and 164.8 million different colors'
                    cart={false}
                    children={undefined}
                  ></ProductListCard>
                ))}
              </section>
              <h3 className='mt-2 flex justify-end'>Total: $2,000,000</h3>
            </Disclosure.Panel>
          </Disclosure>
        </div>
      </div>
    );
  }
);

export default OrderHistory;
