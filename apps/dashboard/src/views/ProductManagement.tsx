import PageTitle from '@/components/layout/PageTitle';
import { RouteHref } from '@/router/enum';
import { Button, TextField } from '@webshop/ui';
import { RiAddLine, RiSearch2Line } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const ProductManagement = () => {
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

      <div className='mt-2'>
        <TextField icon={RiSearch2Line} placeholder='Search products...' />
      </div>
    </div>
  );
};

export default ProductManagement;
