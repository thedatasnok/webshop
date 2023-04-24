import ProductListCard from '@/components/product/ProductListCard';
import { RouteHref } from '@/router';
import { useFindOrdersQuery } from '@/services/userContextOrders';
import { Disclosure } from '@headlessui/react';
import { useDebouncedState } from '@mantine/hooks';
import { OrderDetails } from '@webshop/contracts';
import { formatPrice } from '@webshop/ui';
import clsx from 'clsx';
import { forwardRef } from 'react';
import {
  RiArrowRightSLine,
  RiShoppingCartLine,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

export interface OrderHistoryProps {
  className?: string;
}

interface OrderCardProps {
  order: OrderDetails;
  isLast?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, isLast }) => {
  return (
    <Disclosure defaultOpen={isLast}>
      <Disclosure.Button className='bg-base-900 font-title ui-open:border-primary border-b-base-400 flex items-center rounded-sm border-b-2 px-2 py-2 text-xl font-semibold uppercase'>
        <RiArrowRightSLine className='ui-open:rotate-90 ui-open:transform' />
        <div className='flex w-full justify-between pl-1'>
          <p>Order #{order.id.toString().padStart(4, '0')}</p>
          <p>{order.paymentStatus}</p>
          <p>{order.orderedAt.toString().substring(0, 10)}</p>
        </div>
      </Disclosure.Button>
      <Disclosure.Panel className='px-4 py-2'>
        <section>
          {order.lines.map((line) => (
            <ProductListCard
              key={line.productId}
              to={'/products/' + line.productId}
              name={line.productName}
              id={line.productId}
              shortDescription={line.productShortDescription}
              image={line.productImageUrls[0]}
            >
              <p>{formatPrice(line.subtotal)}</p>
            </ProductListCard>
          ))}
        </section>
      </Disclosure.Panel>
    </Disclosure>
  );
};

const OrderHistory = forwardRef<HTMLDivElement, OrderHistoryProps>(
  ({ className }, ref) => {
    const [searchString, setSearchString] = useDebouncedState('', 500);
    const { data: orders } = useFindOrdersQuery({
      productName: searchString,
    });

    return (
      <div ref={ref} className={clsx(className)}>
        <h1 className='font-title mb-2 hidden text-2xl font-semibold uppercase md:block'>
          Order History
        </h1>

        {orders?.length === 0 ? (
          <NavLink
            className={clsx(
              'border-base-800 bg-base-900/30 hover:border-primary-800 hover:text-primary-600 group flex cursor-pointer',
              'flex-col items-center justify-center gap-2 rounded-sm border p-4 outline-none sm:transition '
            )}
            to={RouteHref.PRODUCTS}
          >
            <RiShoppingCartLine className='h-8 w-8'></RiShoppingCartLine>
            <p>Looks like you haven't ordered anything yet!</p>
            <p>Click here to go shopping</p>
          </NavLink>
        ) : (
          <div>
            <div className='border-base-700 mb-4 mt-4 flex-1 rounded-sm border px-2 py-1 md:mt-0'>
              <input
                type='text'
                className='w-full border-0 bg-transparent p-0 outline-none focus:outline-none focus:ring-0'
                placeholder='Search...'
                aria-label='Search'
                onChange={(e) => setSearchString(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-2'>
              {orders?.map((order, i) => (
                <OrderCard key={order.id} order={order} isLast={i === 0} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default OrderHistory;
