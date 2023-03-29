import { Button, TextField, useSignOutMutation } from '@webshop/ui';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { RiLogoutBoxLine } from 'react-icons/ri';

export interface UserDetailsProps {
  className?: string;
}

const UserDetails = forwardRef<HTMLDivElement, UserDetailsProps>(
  ({ className }, ref) => {
    const [signOut] = useSignOutMutation();

    return (
      <div ref={ref} className={clsx(className)}>
        <h1 className='hidden md:block font-title mt-4 mb-2 text-3xl font-semibold uppercase'>
          Account Details
        </h1>
        <form id='' className='mt-4 md:mt-0'>
          <div className='flex flex-col py-1'>
            <label>E-mail</label>
            <TextField />
          </div>

          <div className='flex flex-col py-1'>
            <label>Name</label>
            <TextField />
          </div>

          <Button className='text-primary border-primary mt-2 rounded-sm border bg-transparent px-4'>
            Change password
          </Button>
        </form>

        <button
          onClick={() => signOut()}
          className='border-error text-error mt-2 flex items-center gap-0.5 rounded-sm border bg-transparent px-2 py-1 pr-2.5'
        >
          <RiLogoutBoxLine />
          <p>Sign out</p>
        </button>
      </div>
    );
  }
);

export default UserDetails;
