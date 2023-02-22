import { Popover, Transition } from '@headlessui/react';
import { useDebouncedState } from '@mantine/hooks';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { RiArrowRightSLine, RiCloseLine, RiSearchLine } from 'react-icons/ri';

export interface SearchOverlayProps {}

export const SearchBar: React.FC<SearchOverlayProps> = () => {
  const [searchValue, setSearchValue] = useDebouncedState('', 500);
  const [showOverlay, setShowOverlay] = useState(false);

  const openOverlay = () => {
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      openOverlay();
    } else {
      closeOverlay();
    }
  }, [searchValue]);

  return (
    <Popover as='div' className='relative flex-1'>
      <div className='border-base-700 z-25 flex w-full flex-1 items-center rounded-sm border px-2 py-1'>
        <input
          type='text'
          className='w-full bg-transparent focus:outline-none'
          placeholder='Search...'
          aria-label='Search'
          onChange={(event) => setSearchValue(event.target.value)}
        />

        <Popover.Button onClick={openOverlay}>
          <RiSearchLine className='text-base-300 h-5 w-5' />
        </Popover.Button>
      </div>

      <Transition show={showOverlay}>
        <Popover.Overlay
          static
          className='bg-base-900 fixed inset-0 z-10 opacity-25'
          onClick={closeOverlay}
        />
      </Transition>

      <Transition show={showOverlay}>
        <Popover.Panel static className='absolute top-full left-0 z-10 w-full'>
          <div className='bg-base-900/50 border-base-700/80 relative mt-1 flex h-96 flex-col overflow-hidden rounded-sm border px-2 py-1 backdrop-blur-xl'>
            <div className='flex items-center justify-between'>
              <h3 className='font-title flex-1 truncate font-medium'>
                <b>Search results for:</b> {searchValue}
              </h3>

              <button onClick={closeOverlay}>
                <RiCloseLine className='h-5 w-5' />
              </button>
            </div>

            <div className='my-1 flex-1 gap-2 overflow-y-auto pr-1'>
              {[...Array(5)].map((_, i, array) => (
                <div
                  key={i}
                  tabIndex={0}
                  className={clsx(
                    'border-base-700 hover:bg-base-700/20 focus:bg-base-700/20 flex w-full cursor-pointer items-center gap-2 px-1 focus:outline-none',
                    i !== array.length - 1 && 'border-b'
                  )}
                >
                  <div className='bg-base-700/60 aspect-sqaure my-1 aspect-square h-12 rounded-sm' />
                  <div className='flex-1 overflow-hidden'>
                    <p className='font-title truncate text-lg font-semibold uppercase'>
                      Product name
                    </p>
                    <p className='text-base-300 truncate text-sm'>
                      specifications
                    </p>
                  </div>

                  <p className='font-title'>$4,000</p>

                  <RiArrowRightSLine className='h-5 w-5' />
                </div>
              ))}
            </div>

            <button className='font-title justify-self-start text-sm font-semibold uppercase tracking-wider hover:underline'>
              Show all results
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
