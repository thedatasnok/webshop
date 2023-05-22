import CustomTooltip from '@/components/chart/CustomTooltip';
import {
  useFindDailyOrderSummaryQuery,
  useRecentOrdersQuery,
} from '@/services/orders';
import { Button, formatPrice } from '@webshop/ui';
import dayjs from 'dayjs';
import React from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Dashboard = () => {
  const { data: orderSummary } = useFindDailyOrderSummaryQuery();
  const { data: recentOrders } = useRecentOrdersQuery();

  return (
    <div className='relative grid h-full grid-rows-2 px-4 pt-4'>
      <section id='chart' className='flex flex-col'>
        <h2 className='font-title mb-1 text-xl font-semibold'>
          Orders last 7 days
        </h2>

        <ResponsiveContainer width='100%' height='100%'>
          <ComposedChart data={orderSummary}>
            <defs>
              <linearGradient id='sumColor' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#00AEAE' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#00AEAE' stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey='date' />
            <YAxis hide />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type='monotone'
              dataKey='sumOfSales'
              stroke='#1FFFFF'
              fillOpacity={1}
              fill='url(#sumColor)'
            />
            <YAxis yAxisId={'number'} hide />
            <Bar
              yAxisId={'number'}
              dataKey='numberOfSales'
              barSize={40}
              fill='#F726D4'
              opacity={0.75}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </section>

      <section id='recent-sales'>
        <h2 className='font-title mb-2 text-xl font-semibold'>Recent orders</h2>
        <ol className='font-title divide-base-700 divide-y overflow-y-auto'>
          {recentOrders?.map((order, i) => (
            <li key={i} className='grid grid-cols-7 justify-between px-2 py-2'>
              <RecentOrderGroup
                title='Order id'
                text={<>#{order.id.toString().padStart(4, '0')}</>}
              />

              <RecentOrderGroup title='Total' text={formatPrice(order.total)} />

              <RecentOrderGroup
                title='Customer'
                text={
                  <>
                    <span>{order.customerName}</span>
                    &nbsp;
                    <a
                      href={'mailto:'.concat(order.customerEmail)}
                      className='text-base-300 hover:text-primary'
                    >
                      ({order.customerEmail})
                    </a>
                  </>
                }
              />

              <RecentOrderGroup title='Status' text={order.orderStatus} />

              <RecentOrderGroup
                title='# of order lines'
                text={order.numberOfLines}
              />

              <RecentOrderGroup
                title='Order placed'
                text={dayjs(order.orderedAt).fromNow()}
              />

              <div className='my-auto justify-self-end'>
                <Button variant='neutral' style='outline' size='sm'>
                  View details
                </Button>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

interface RecentOrderGroupProps {
  title: string;
  text: React.ReactNode;
}

const RecentOrderGroup: React.FC<RecentOrderGroupProps> = ({ title, text }) => {
  return (
    <div>
      <p className='text-sm font-semibold uppercase'>{title}</p>
      <p className='text-sm'>{text}</p>
    </div>
  );
};

export default Dashboard;
