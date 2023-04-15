import { Listbox, Transition } from '@headlessui/react';
import {
  RiArrowDownSLine,
  RiCheckLine,
  RiSortAsc,
  RiSortDesc,
} from 'react-icons/ri';

export const enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface SortByFieldProps {
  /**
   * List of fields that can be sorted by.
   */
  fields: string[];

  /**
   * The field that is currently being sorted by.
   */
  field: string;

  /**
   * The direction to sort in.
   */
  direction: SortDirection;

  /**
   * On change handler for when the field or direction is supposed to change.
   * The component does not handle state, thus handling this is up to the parent to make it re-render.
   *
   * @param field the new field to sort by
   * @param direction the new direction to sort in
   *
   * @returns void
   */
  onChange?: (field: string, direction: SortDirection) => void;
}

/**
 * Component for sorting by a field, toggling between ascending and descending direction.
 */
const SortByField: React.FC<SortByFieldProps> = ({
  fields,
  field,
  direction,
  onChange,
}) => {
  const emitChange = (field: string, direction: SortDirection) => {
    onChange?.(field, direction);
  };

  const toggleDirection = () => {
    if (direction === SortDirection.ASC) {
      emitChange(field, SortDirection.DESC);
    } else {
      emitChange(field, SortDirection.ASC);
    }
  };

  return (
    <div className='border-base-700 relative flex rounded-sm border'>
      <Listbox value={field} onChange={(e) => emitChange(e, direction)}>
        <Listbox.Button className='flex items-center pl-2 pr-1'>
          <span className='font-title text-base-200 text-lg font-semibold'>
            {field}
          </span>
          <RiArrowDownSLine className='h-5 w-5' />
        </Listbox.Button>
        <Transition>
          <Listbox.Options className='border-base-700 bg-base-900/10 absolute -left-px top-full z-10 mt-1 rounded-sm border outline-none backdrop-blur-xl'>
            {fields.map((value, fieldIdx) => (
              <Listbox.Option
                value={value}
                key={fieldIdx}
                className='font-title ui-active:text-primary-600 ui-selected:text-primary flex items-center gap-1 px-1 pr-3 font-semibold hover:cursor-pointer'
              >
                <RiCheckLine className='ui-selected:visible invisible' />
                <span>{value}</span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>

      <button
        onClick={toggleDirection}
        className='border-base-800 bg-base-800/30 hover:bg-base-800 border-l px-1'
      >
        {direction === SortDirection.ASC ? (
          <RiSortAsc className='h-5 w-5' />
        ) : (
          <RiSortDesc className='h-5 w-5' />
        )}
      </button>
    </div>
  );
};

export default SortByField;
