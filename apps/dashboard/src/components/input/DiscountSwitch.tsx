import { Switch } from '@headlessui/react';
import { RiPercentLine } from 'react-icons/ri';

interface DiscountSwitchProps {
  value: boolean;
  onChange?: (value: boolean) => void;
}
const DiscountSwitch: React.FC<DiscountSwitchProps> = ({ value, onChange }) => {
  return (
    <Switch
      checked={value}
      onChange={onChange}
      className='bg-base-900 ui-checked:from-base-900 ui-checked:to-secondary-700 border-base-900 relative inline-flex h-4 w-10 items-center rounded-sm border bg-gradient-to-r outline-none'
    >
      <span className='sr-only'>Mark as discounted</span>

      <span className='ui-checked:translate-x-5 bg-base-700 ui-checked:bg-secondary inline-block h-5 w-5 -translate-x-0.5 transform rounded-sm transition'>
        <RiPercentLine className='h-5 w-5' />
      </span>
    </Switch>
  );
};

export default DiscountSwitch;
