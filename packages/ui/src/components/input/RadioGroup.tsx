import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { IconType } from 'react-icons';

export interface RadioGroupOption<T> {
  /**
   * The value of the option.
   * This is the value that will be returned on change, and should be unique within the set of options.
   */
  value: T;
  /**
   * The icon to render for the option, displayed to the left of the name and description.
   */
  icon: IconType;
  /**
   * The name of the option.
   */
  name: string;
  /**
   * The description of the option, displayed under the name.
   */
  description?: string;
}

export interface RadioGroupProps<T> {
  /**
   * The set of options to render in the radio group.
   */
  options: RadioGroupOption<T>[];

  /**
   * Render function that allows for rendering custom content for each option.
   *
   * @param props the option to render
   *
   * @returns a react node to render within the radio group option
   */
  children?: (props: RadioGroupOption<T>) => React.ReactNode;
}

/**
 * Shared component for rendering a radio group.
 * Takes a set of options, and optionally a children slot.
 */
const RadioGroup = <T,>({ options, children }: RadioGroupProps<T>) => {
  const [selected, setSelected] = useState<T>(options[0].value);

  const handleSelectedChanged = (value: T) => {
    setSelected(value);
  };

  return (
    <HeadlessRadioGroup value={selected} onChange={handleSelectedChanged}>
      <div>
        {options.map(({ value, icon: Icon, name, description }, i, array) => (
          <HeadlessRadioGroup.Option
            key={name}
            value={value}
            className={clsx(
              'ui-checked:text-primary ui-checked:bg-primary/5 ui-checked:border-primary',
              'border-base-800 bg-base-800/10 flex cursor-pointer items-center gap-2 border px-2 py-1 pb-1.5 outline-none',
              i === 0 && 'rounded-t-md',
              i === array.length - 1 && 'rounded-b-md'
            )}
          >
            {/* Mock checkbox, to provide some extra visual feedback */}
            <div
              role='checkbox'
              className='bg-base-700 ring-base-800 ui-checked:bg-primary-600 ui-checked:ring-primary-900 h-2 w-2 rounded-full ring'
            />

            <Icon className='h-7 w-7' />

            <div className='flex-1'>
              <HeadlessRadioGroup.Label className='font-title text-sm font-semibold uppercase'>
                {name}
              </HeadlessRadioGroup.Label>

              {description && (
                <HeadlessRadioGroup.Description className='text-base-200 ui-checked:text-primary -mt-1 text-sm'>
                  {description}
                </HeadlessRadioGroup.Description>
              )}
            </div>

            {/* Children slot, allows for rendering custom content if applicable */}
            {children?.({ value, icon: Icon, name, description })}
          </HeadlessRadioGroup.Option>
        ))}
      </div>
    </HeadlessRadioGroup>
  );
};

export default RadioGroup;
