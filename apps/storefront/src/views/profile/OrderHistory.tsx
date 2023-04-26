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
  RiAddCircleFill,
  RiAddCircleLine,
  RiAddLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiPlayListAddLine,
  RiQuestionMark,
  RiSearchLine,
  RiShoppingCartLine,
  RiStore2Line,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

export interface OrderHistoryProps {
  className?: string;
}

interface ProductListCardOrderHistoryActionsProps {
  price: number;
  previousPrice: number | null;
  quantity: number;
  isDiscount: boolean;
}

const ProductListCardOrderHistoryActions: React.FC<
  ProductListCardOrderHistoryActionsProps
> = ({ price, previousPrice, quantity, isDiscount }) => {
  const totalPrice = price * quantity;

  return (
    <div className='flex flex-col items-end justify-end gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-0'>
      <div className='flex'>
        <p>{quantity}&nbsp;x&nbsp;</p>
        {formatPrice(price)}
        <div
          className={clsx({
            'flex flex-col items-end': isDiscount,
            'flex flex-row items-center': !isDiscount,
          })}
        >
          <div className='flex w-16 justify-end'>{formatPrice(totalPrice)}</div>
          {isDiscount && previousPrice && (
            <div className='bg-secondary/30 border-secondary text-secondary-50 w-fit whitespace-nowrap rounded-sm border px-1 text-xs'>
              -{formatPrice(previousPrice * quantity - totalPrice)}
            </div>
          )}
        </div>
      </div>

      <div className='flex gap-2'>
        <div className='block sm:hidden'>{quantity}</div>
      </div>
    </div>
  );
};

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
        <section className='flex justify-between'>
          <div>
            <h2 className='font-title text-lg font-semibold uppercase'>
              Billing address
            </h2>
            <div className='text-base-300'>
              <p>{order.billingAddress.careOf}</p>
              <p>{order.billingAddress.street}</p>
              <p>
                {order.billingAddress.postalCode} {order.billingAddress.city}
              </p>
              <p>{order.billingAddress.country}</p>
            </div>
          </div>
          <div>
            <h2 className='font-title text-lg font-semibold uppercase'>
              Delivery address
            </h2>
            <div className='text-base-300'>
              <p>{order.deliveryAddress.careOf}</p>
              <p>{order.deliveryAddress.street}</p>
              <p>
                {order.deliveryAddress.postalCode} {order.deliveryAddress.city}
              </p>
              <p>{order.deliveryAddress.country}</p>
            </div>
          </div>
        </section>

        <section className='mt-4'>
          <h2 className='font-title text-lg font-semibold uppercase'>
            Options
          </h2>
          <div className='text-base-300'>
            <p>Payment method: {order.paymentMethod.replace('_', ' ')}</p>
            <p>Shipping method: {order.shippingMethod.replace('_', ' ')}</p>
          </div>
        </section>

        <section className='mt-4'>
          <h2 className='font-title text-lg font-semibold uppercase'>
            Products
          </h2>
          {order.lines.map((line) => (
            <ProductListCard
              key={line.productId}
              to={'/products/' + line.productId}
              name={line.productName}
              id={line.productId}
              shortDescription={line.productShortDescription}
              image={line.productImageUrls[0]}
            >
              <ProductListCardOrderHistoryActions
                quantity={line.quantity}
                price={line.unitPrice}
                previousPrice={line.previousUnitPrice}
                isDiscount={line.wasDiscount}
              />
            </ProductListCard>
          ))}

          <p className='mt-2 flex justify-end'>
            Total: {formatPrice(order.total)}
          </p>
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

        <div className='border-base-700 mb-4 mt-4 flex-1 rounded-sm border px-2 py-1 md:mt-0'>
          <input
            type='text'
            className='w-full border-0 bg-transparent p-0 outline-none focus:outline-none focus:ring-0'
            placeholder='Search...'
            aria-label='Search'
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>

        {orders?.length === 0 && searchString.length > 0 && (
          <div>
            <div
              className={clsx(
                'text-base-400 group flex border-none',
                'flex-col items-center justify-center gap-2 rounded-sm border p-4 outline-none sm:transition '
              )}
            >
              <RiSearchLine className='h-16 w-16' />
              <p className='text-center'>
                Could not find orders matching "{searchString}".
              </p>
            </div>
          </div>
        )}

        {orders?.length === 0 && searchString.length === 0 && (
          <div>
            <NavLink
              className={clsx(
                'border-base-950 hover:text-primary-600 text-base-400 group flex cursor-pointer',
                'flex-col items-center justify-center gap-2 rounded-sm border p-4 outline-none sm:transition '
              )}
              to={RouteHref.PRODUCTS}
            >
              <RiAddLine className='absolute h-8 w-8 -translate-y-14 translate-x-9' />
              <RiShoppingCartLine className='h-16 w-16' />
              <p className='text-center'>
                Looks like you haven't ordered anything yet. <br />
                Go shopping!
              </p>
            </NavLink>
          </div>
        )}

        <div className='flex flex-col gap-2'>
          {orders?.map((order, i) => (
            <OrderCard key={order.id} order={order} isLast={i === 0} />
          ))}
        </div>
      </div>
    );
  }
);

export default OrderHistory;
