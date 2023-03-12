import CustomTooltip from '@/components/chart/CustomTooltip';
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

// a week of varying sample data
const SAMPLE_DATA = [
  {
    date: '12.03.2023',
    salesSum: 1000,
    numberOfSales: 10,
  },
  {
    date: '13.03.2023',
    salesSum: 2000,
    numberOfSales: 20,
  },
  {
    date: '14.03.2023',
    salesSum: 3000,
    numberOfSales: 30,
  },
  {
    date: '15.03.2023',
    salesSum: 4000,
    numberOfSales: 40,
  },
  {
    date: '16.03.2023',
    salesSum: 5000,
    numberOfSales: 50,
  },
  {
    date: '17.03.2023',
    salesSum: 3000,
    numberOfSales: 40,
  },
  {
    date: '18.03.2023',
    salesSum: 2000,
    numberOfSales: 10,
  },
  {
    date: '19.03.2023',
    salesSum: 1000,
    numberOfSales: 12,
  },
];

const Dashboard = () => {
  return (
    <div className='relative grid h-full grid-rows-2 px-4 pt-4'>
      <section id='chart' className='flex flex-col'>
        <h2 className='font-title mb-1 text-xl font-semibold'>
          Orders last 7 days
        </h2>

        <ResponsiveContainer width='100%' height='100%'>
          <ComposedChart data={SAMPLE_DATA}>
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
              dataKey='salesSum'
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
        <div className='divide-base-700 divide-y overflow-y-auto'>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className='flex items-center justify-between py-2 px-2'
            >
              <div>
                <p className='font-title text-sm font-semibold uppercase'>
                  order id
                </p>
                <p className='font-title'>#000{i + 1}</p>
              </div>
              <div className='text-center'>
                <p className='font-title text-sm font-semibold uppercase'>
                  total
                </p>
                <p className='font-title'>$100</p>
              </div>
              <div>
                <p className='font-title text-sm font-semibold uppercase'>
                  Order placed
                </p>
                <p className='text-sm'>x minutes ago</p>
              </div>
              <button className='font-title border-base-600 hover:bg-base-800 border px-1 text-sm uppercase transition-all'>
                Show details
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
