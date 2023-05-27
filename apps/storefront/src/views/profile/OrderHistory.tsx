import ProductListCard from '@/components/product/ProductListCard';
import { RouteHref } from '@/router';
import {
  useCancelOrderMutation,
  useFindOrdersQuery,
} from '@/services/userContextOrders';
import { Disclosure } from '@headlessui/react';
import { useDebouncedState } from '@mantine/hooks';
import { OrderDetails } from '@webshop/contracts';
import { Button, DialogPrompt, formatPrice } from '@webshop/ui';
import Case from 'case';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { forwardRef, useState } from 'react';
import {
  RiAddLine,
  RiArrowRightSLine,
  RiBitCoinLine,
  RiSearchLine,
  RiShoppingCartLine,
  RiTruckLine,
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

/**
 * One-off component for displaying the price and quantity of a product in the order history.
 */
const ProductListCardOrderHistoryActions: React.FC<
  ProductListCardOrderHistoryActionsProps
> = ({ price, previousPrice, quantity, isDiscount }) => {
  const totalPrice = price * quantity;

  return (
    <div className='font-title flex flex-col items-end sm:flex-row sm:items-center sm:gap-4'>
      <p>
        {quantity}&nbsp;&times;&nbsp;{formatPrice(price)}
      </p>

      <div className='flex flex-col items-end font-semibold sm:min-w-[5rem]'>
        <div className='text-xl'>{formatPrice(totalPrice)}</div>
        {isDiscount && previousPrice && (
          <div className='bg-secondary/30 border-secondary text-secondary-50 w-fit whitespace-nowrap rounded-sm border px-1 text-xs'>
            {formatPrice(totalPrice - previousPrice * quantity)}
          </div>
        )}
      </div>
    </div>
  );
};

interface OrderCardProps {
  order: OrderDetails;
  isLast?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, isLast }) => {
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [cancelOrder] = useCancelOrderMutation();

  const handleCancelOrder = async () => {
    try {
      cancelOrder(order.id);
      setShowCancelConfirmation(false);
    } catch (error) {
      console.error(error);
    }
  };

  const orderId = order.id.toString().padStart(4, '0');

  return (
    <>
      <Disclosure defaultOpen={isLast}>
        <Disclosure.Button className='font-title ui-open:border-primary-800 border-base-700 hover:bg-base-900 focus:bg-base-900 flex items-center rounded-sm border px-2 py-2 text-xl font-semibold uppercase outline-none transition'>
          <RiArrowRightSLine className='ui-open:rotate-90 transform transition' />
          <div className='grid w-full grid-cols-3 items-center justify-items-start pl-1 sm:grid-cols-4'>
            <p>Order #{orderId}</p>

            <p className='inline-flex items-center gap-1 justify-self-center'>
              <RiBitCoinLine className='h-6 w-6' />
              <span className='sr-only'>Payment status:</span>
              <span>{order.paymentStatus}</span>
            </p>

            <p className='inline-flex items-center gap-1 justify-self-center'>
              <RiTruckLine className='h-6 w-6' />
              <span className='sr-only'>Order status:</span>
              <span>{order.status}</span>
            </p>

            <p className='justify-self-end max-sm:hidden'>
              {dayjs(order.orderedAt).format('L')}
            </p>
          </div>
        </Disclosure.Button>

        <Disclosure.Panel className='relative px-4 py-2'>
          <section className='grid justify-between gap-2 sm:grid-cols-3'>
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
                  {order.deliveryAddress.postalCode}{' '}
                  {order.deliveryAddress.city}
                </p>
                <p>{order.deliveryAddress.country}</p>
              </div>
            </div>

            <div
              className={clsx(
                'absolute right-2 top-2',
                order.status === 'CANCELLED' && 'invisible'
              )}
            >
              <Button
                variant='neutral'
                className='h-fit'
                onClick={() => setShowCancelConfirmation(true)}
              >
                Cancel order
              </Button>
            </div>
          </section>

          <section className='mt-4'>
            <h2 className='font-title text-lg font-semibold uppercase'>
              Details
            </h2>

            <p className='text-base-300 text-sm'>
              Contact: {order.customerName}{' '}
              <a
                className='text-base-400 hover:text-primary transition hover:underline'
                href={'mailto:'.concat(order.customerEmail)}
              >
                ({order.customerEmail})
              </a>
            </p>
            <p className='text-base-300 text-sm'>
              Order placed: {dayjs(order.orderedAt).format('LLLL')}
            </p>
            <p className='text-base-300 text-sm'>
              Payment method:{' '}
              {Case.sentence(order.paymentMethod.replace('_', ' '))}
            </p>
            <p className='text-base-300 text-sm'>
              Shipping method:{' '}
              {Case.sentence(order.shippingMethod.replace('_', ' '))}
            </p>
          </section>

          <section className='mt-4'>
            <h2 className='font-title text-lg font-semibold uppercase'>
              Products
            </h2>

            <ul>
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
            </ul>

            <p className='font-title mt-2 flex justify-end text-xl font-semibold uppercase'>
              Total: {formatPrice(order.total)}
            </p>
          </section>
        </Disclosure.Panel>
      </Disclosure>

      <DialogPrompt
        action={handleCancelOrder}
        isOpen={showCancelConfirmation}
        message='Are you sure you want to cancel this order?'
        onClose={() => setShowCancelConfirmation(false)}
        title={`Cancel order #${orderId}`}
      />
    </>
  );
};

/**
 * Displays the order history of the current user, allowing them to search through by product name.
 * This is displayed on the User profile page.
 */
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
