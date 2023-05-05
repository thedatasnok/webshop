import { Switch as HeadlessSwitch } from '@headlessui/react';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';

interface SwitchProps {
  id?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  ariaLabel?: string;
}

const Switch: React.FC<SwitchProps> = ({ id, checked, onChange, ariaLabel }) => {
  return (
    <HeadlessSwitch
      id={id}
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
      className='bg-base-900 border-base-900 relative inline-flex h-4 w-10 items-center rounded-sm border bg-gradient-to-r outline-none'
    >
      <span className='sr-only'>{ariaLabel}</span>

      <span className='ui-checked:translate-x-5 text-base-300 bg-base-700 ui-checked:bg-primary ui-checked:text-base-950 inline-block h-5 w-5 -translate-x-0.5 transform rounded-sm transition'>
        <RiCheckLine className='h-5 w-5 ui-not-checked:hidden' />
        <RiCloseLine className='h-5 w-5 ui-checked:hidden' />
      </span>
    </HeadlessSwitch>
  );
};

export default Switch;
