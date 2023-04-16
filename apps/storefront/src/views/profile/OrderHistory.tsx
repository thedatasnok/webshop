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
      <div className='w-full'>
        <section ref={ref} className={clsx(className)}>
          <h1 className='font-title mb-2 mt-4 hidden text-3xl font-semibold uppercase md:block'>
            Order History
          </h1>
          <div className='border-base-700 mb-4 mt-4 w-full flex-1 rounded-sm border px-2 py-1 md:mt-0'>
            <input
              type='text'
              className='w-full border-0 bg-transparent p-0 outline-none focus:outline-none focus:ring-0'
              placeholder='Search...'
              aria-label='Search'
            />
          </div>
        </section>

        <section className='flex flex-col gap-2'>
          {orders?.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </section>
      </div>
    );
  }
);

export default OrderHistory;
