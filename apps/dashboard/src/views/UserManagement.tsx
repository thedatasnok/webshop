import NoSearchResults from '@/components/feedback/NoSearchResults';
import PageTitle from '@/components/layout/PageTitle';
import { RouteHref } from '@/router/enum';
import { useFindUserAccountsQuery } from '@/services/userAccounts';
import { useDebouncedValue } from '@mantine/hooks';
import { Button, LoadingBar, Switch, TextField } from '@webshop/ui';
import clsx from 'clsx';
import { useState } from 'react';
import { RiCheckLine, RiCloseLine, RiSearchLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const UserManagement = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState(false);

  const [debouncedFullName] = useDebouncedValue(fullName, 500);
  const [debouncedEmail] = useDebouncedValue(email, 500);

  const { data: users, isFetching } = useFindUserAccountsQuery({
    email: debouncedEmail ? debouncedEmail : undefined, // only filter if email is not empty
    fullName: debouncedFullName ? debouncedFullName : undefined, // only filter if fullName is not empty
    verified: verified ? verified : undefined, // only filter if verified is true
  });

  return (
    <div className='px-4 pt-4'>
      <PageTitle title='Users' />

      <section className='my-2 flex items-center gap-2'>
        <TextField
          icon={RiSearchLine}
          placeholder='Name'
          value={fullName}
          onChange={setFullName}
        />

        <TextField
          icon={RiSearchLine}
          placeholder='Email'
          value={email}
          onChange={setEmail}
        />

        <Switch
          ariaLabel='Show only verified accounts'
          checked={verified}
          onChange={setVerified}
        />

        <span className='font-title text-base-300 text-sm uppercase'>
          Show only verified accounts
        </span>
      </section>

      <div role='table' className='grid grid-cols-5 items-center'>
        <div role='row' className='grid-cols-inherit col-span-5 grid'>
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
            Role
          </h2>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b text-center text-lg font-semibold uppercase'
          >
            Email verified
          </h2>
          <h2
            role='columnheader'
            className='font-title border-base-700 border-b text-center text-lg font-semibold uppercase'
          >
            Orders placed
          </h2>
          <h2
            role='columnheader'
            className='border-base-700 preserve-line border-b text-lg'
          >
            {/* shows only for screen readers */}
            <span className='sr-only'>Actions</span>
          </h2>
        </div>

        <LoadingBar loading={isFetching} className='col-span-5' />

        {!isFetching && users?.length === 0 && (
          <NoSearchResults text='No products found' className='col-span-6' />
        )}

        {users?.map((user, idx, array) => (
          <div
            role='row'
            key={user.id}
            className={clsx(
              'grid-cols-inherit col-span-5 grid items-center p-1',
              array.length - 1 !== idx && 'border-base-800 border-b'
            )}
          >
            <div role='cell'>
              <span className='block font-medium'>{user.name}</span>
              <a
                href={'mailto:'.concat(user.email)}
                className='text-base-300 hover:text-primary block text-sm transition-colors hover:underline'
              >
                {user.email}
              </a>
            </div>
            <div role='cell' className='font-title text-center font-semibold'>
              {user.role}
            </div>
            <div role='cell' className='font-title text-center font-semibold'>
              {user.emailVerified ? (
                <RiCheckLine className='text-ok mx-auto h-5 w-5' />
              ) : (
                <RiCloseLine className='text-error mx-auto h-5 w-5' />
              )}
            </div>
            <div role='cell' className='text-center'>
              {user.orderCount}
            </div>
            <div
              role='cell'
              className='flex items-center justify-end gap-2 p-2 text-sm'
            >
              <NavLink
                to={RouteHref.ORDER_MANAGEMENT.concat('?customerId=' + user.id)}
              >
                <Button variant='neutral'>View orders</Button>
              </NavLink>
              <Button variant='destructive'>Disable account</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
