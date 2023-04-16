import { RouteHref } from '@/router';
import { useFindProductsQuery } from '@/services/products';
import { Popover, Transition } from '@headlessui/react';
import { useDebouncedValue } from '@mantine/hooks';
import clsx from 'clsx';
import { FormEvent, useEffect, useState } from 'react';
import {
  RiArrowRightSLine,
  RiCloseLine,
  RiLoader5Line,
  RiSearchLine,
} from 'react-icons/ri';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export interface SearchOverlayProps {}

/**
 * Search bar component with search overlay.
 * Used to search for products, it will open a search overlay when the user starts typing.
 */
export const SearchBar: React.FC<SearchOverlayProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // the debounced search value is derived from the search value state
  // since we need to access the raw, un-debounced value in the handleSearch method
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);
  const { data: products, isFetching } = useFindProductsQuery({
    name: debouncedSearchValue,
  });

  const MAX_PRODUCTS_SHOWN = 5;

  /**
   * Opens the search overlay, if checkContent is true, it will only open if the searchValue is not empty.
   */
  const openOverlay = (checkContent?: boolean) => {
    if (checkContent && searchValue.length === 0) return;
    setShowOverlay(true);
  };

  /**
   * Closes the search overlay.
   */
  const closeOverlay = () => {
    setShowOverlay(false);
  };

  /**
   * Handles the search form submit.
   * Also empties the search input.
   *
   * @param event the event that triggered the submit
   */
  const handleSearch = (event: FormEvent | Event) => {
    event.preventDefault();
    navigate({
      pathname: RouteHref.PRODUCTS,
      search: `?search=${searchValue}`,
    });
  };

  // whenver the location changes, empty the search input
  // this prevents the search input from showing the search value after navigating to the product browser
  // or a product page
  useEffect(() => setSearchValue(''), [location]);

  useEffect(() => {
    // only show the overlay if the search string is not empty
    if (searchValue.length > 0) {
      openOverlay();
    } else {
      closeOverlay();
    }
  }, [searchValue]);

  return (
    <Popover as='div' className='relative flex-1'>
      <form
        onSubmit={handleSearch}
        className='border-base-700 z-25 flex w-full flex-1 items-center rounded-sm border px-2 py-1'
      >
        <input
          type='text'
          className='w-full border-none bg-transparent p-0 focus:outline-none focus:ring-0'
          placeholder='Search...'
          aria-label='Search'
          value={searchValue}
          onFocus={() => openOverlay(true)}
          onChange={(event) => setSearchValue(event.target.value)}
        />

        <Popover.Button onClick={() => openOverlay()}>
          <span className='sr-only'>Search</span>
          <RiSearchLine className='text-base-300 h-5 w-5' />
        </Popover.Button>
      </form>

      <Transition show={showOverlay}>
        <Popover.Overlay
          static
          className='bg-base-900 fixed inset-0 z-10 opacity-25'
          onClick={closeOverlay}
        />
      </Transition>

      <Transition show={showOverlay}>
        <Popover.Panel static className='absolute left-0 top-full z-10 w-full'>
          <div className='bg-base-900/50 border-base-700/80 relative mt-1 flex flex-col overflow-hidden rounded-sm border px-2 py-1 backdrop-blur-xl'>
            <div className='flex items-center justify-between'>
              <h3 className='font-title flex-1 truncate font-medium'>
                <b>Search results for:</b> {debouncedSearchValue}
              </h3>

              <button onClick={closeOverlay}>
                <RiCloseLine className='h-5 w-5' />
              </button>
            </div>

            <div className='my-1 flex-1 gap-2 overflow-y-auto pr-1'>
              {!isFetching && products?.length === 0 && (
                <p className='text-base-300 font-title my-4 text-center font-semibold uppercase'>
                  No results matching that search phrase
                </p>
              )}

              {isFetching && (
                <RiLoader5Line className='mx-auto h-10 w-10 animate-spin' />
              )}

              {!isFetching &&
                searchValue.length > 0 &&
                products
                  ?.slice(0, MAX_PRODUCTS_SHOWN)
                  .map((product, i, array) => (
                    <NavLink
                      to={[RouteHref.PRODUCTS, product.id].join('/')}
                      key={i}
                      tabIndex={0}
                      className={clsx(
                        'border-base-700 hover:bg-base-700/20 focus:bg-base-700/20 flex w-full cursor-pointer items-center gap-2 px-1 focus:outline-none',
                        i !== array.length - 1 && 'border-b'
                      )}
                    >
                      <div
                        className='bg-base-700/60 aspect-sqaure my-1 aspect-square h-12 rounded-sm bg-cover'
                        style={{
                          backgroundImage: `url(${product.imageUrls[0]})`,
                        }}
                      />
                      <div className='flex-1 overflow-hidden'>
                        <p className='font-title truncate text-lg font-semibold uppercase'>
                          {product.name}
                        </p>
                        <p className='text-base-300 truncate text-sm'>
                          specifications
                        </p>
                      </div>

                      <p className='font-title'>${product.price}</p>

                      <RiArrowRightSLine className='h-5 w-5' />
                    </NavLink>
                  ))}
            </div>

            {!isFetching &&
              products &&
              products.length > MAX_PRODUCTS_SHOWN && (
                <button
                  onClick={handleSearch}
                  className='font-title justify-self-start text-sm font-semibold uppercase tracking-wider hover:underline'
                >
                  Show all results
                </button>
              )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
