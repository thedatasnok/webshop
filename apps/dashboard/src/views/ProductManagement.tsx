import NoSearchResults from '@/components/feedback/NoSearchResults';
import PageTitle from '@/components/layout/PageTitle';
import { RouteHref } from '@/router/enum';
import { useDebouncedValue } from '@mantine/hooks';
import {
  Button,
  LoadingBar,
  Switch,
  TextField,
  formatPrice,
  useFindProductsQuery,
} from '@webshop/ui';
import clsx from 'clsx';
import { useState } from 'react';
import {
  RiAddLine,
  RiCheckLine,
  RiCloseLine,
  RiSearch2Line,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const ProductManagement = () => {
  const [productName, setProductName] = useState('');
  const [showDiscontinued, setShowDiscontinued] = useState(false);

  const [debouncedProductName] = useDebouncedValue(productName, 500);

  const { data: products, isFetching } = useFindProductsQuery({
    name: debouncedProductName,
    includeDiscontinued: showDiscontinued,
  });

  return (
    <div className='flex h-full flex-col overflow-y-auto px-4 py-4'>
      <div className='flex items-center justify-between'>
        <PageTitle title='Products' />

        <NavLink to={RouteHref.NEW_PRODUCT} className='outline-none'>
          <Button type='button' style='outline'>
            <span>New product</span>
            <RiAddLine className='-mr-1 mb-0.5 h-4 w-4' />
          </Button>
        </NavLink>
      </div>

      <div className='my-2 flex items-center gap-2'>
        <TextField
          icon={RiSearch2Line}
          placeholder='Search products...'
          value={productName}
          onChange={setProductName}
        />

        <Switch
          ariaLabel='Show discontinued products'
          checked={showDiscontinued}
          onChange={setShowDiscontinued}
        />

        <span className='font-title text-base-300 text-sm uppercase'>
          Show discontinued products
        </span>
      </div>

      <div role='table' className='grid grid-cols-6 items-center'>
        <div role='row' className='grid-cols-inherit col-span-6 grid'>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b pl-1 text-lg font-semibold uppercase'
          >
            Id
          </h2>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b pl-1 text-lg font-semibold uppercase'
          >
            Name
          </h2>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b text-center text-lg font-semibold uppercase'
          >
            Current price
          </h2>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b text-center text-lg font-semibold uppercase'
          >
            Discounted
          </h2>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b text-center text-lg font-semibold uppercase'
          >
            Previous price
          </h2>
          <h2
            role='columnheader'
            className='border-base-700 preserve-line border-b text-lg'
          >
            {/* shows only for screen readers */}
            <span className='sr-only'>Actions</span>
          </h2>
        </div>

        <LoadingBar loading={isFetching} className='col-span-6' />

        {!isFetching && products?.length === 0 && (
          <NoSearchResults text='No products found' className='col-span-6' />
        )}

        {products?.map((product, idx, array) => (
          <div
            role='row'
            key={product.id}
            className={clsx(
              'grid-cols-inherit col-span-6 grid items-center p-1',
              array.length - 1 !== idx && 'border-base-800 border-b'
            )}
          >
            <span role='cell' className='font-title font-medium'>
              #{product.id.toString().padStart(4, '0')}
            </span>

            <span role='cell' className='font-title font-semibold'>
              {product.name}
            </span>

            <span role='cell' className='font-title text-center font-semibold'>
              {product.price ? (
                <>{formatPrice(product.price)}</>
              ) : (
                <>DISCONTINUED</>
              )}
            </span>

            <div role='cell' className='font-title text-center font-semibold'>
              {product.isDiscount ? (
                <RiCheckLine className='text-ok mx-auto h-5 w-5' />
              ) : (
                <RiCloseLine className='text-error mx-auto h-5 w-5' />
              )}
            </div>

            <span
              className={clsx(
                'font-title text-center font-semibold',
                !product.previousPrice && 'text-base-400'
              )}
            >
              {product.previousPrice ? (
                <>{formatPrice(product.previousPrice)}</>
              ) : (
                <>N/A</>
              )}
            </span>

            <div
              role='cell'
              className='flex items-center justify-end gap-2 p-2 text-sm'
            >
              <NavLink to={RouteHref.NEW_PRODUCT}>
                <Button size='sm' variant='neutral'>
                  Edit
                </Button>
              </NavLink>
              <Button size='sm' variant='destructive'>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
