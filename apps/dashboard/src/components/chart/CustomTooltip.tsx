import { formatPrice } from '@webshop/ui';
import { TooltipProps } from 'recharts';

/**
 * Custom tooltip component that is used for the recent sales graph in the dashobard.
 */
const CustomTooltip: React.FC<TooltipProps<number[], string>> = ({
  payload,
}) => {
  const translations: { [k: string]: string } = {
    sumOfSales: 'Sales sum',
    numberOfSales: 'Number of sales',
  };

  return (
    <div className='bg-base-900/80 rounded-md px-2 py-1'>
      <h1 className='font-title font-bold'>Sales statistics</h1>
      {payload?.map((item) => (
        <div key={item.name} className='flex items-center gap-2'>
          <div
            className='h-2 w-2 rounded-full'
            style={{ backgroundColor: item.color }}
          />
          <p className='font-title font-semibold'>
            {item.name !== undefined ? translations[item.name] : '--'}:
          </p>
          <p className='font-title font-semibold'>
            {item.name === 'sumOfSales' && item.value
              ? formatPrice(item.value as any) // this is never an array - idk why it's typed as one
              : item.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CustomTooltip;
