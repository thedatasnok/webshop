import { useSignOutMutation } from '@/services/auth';
import { Button, TextField } from '@webshop/ui';
import clsx from 'clsx';
import { RiLogoutBoxLine } from 'react-icons/ri';

export interface UserDetailsProps {
  className?: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ className }) => {
  const [signOut] = useSignOutMutation();

  return (
    <div className={clsx(className)}>
      <h1 className='font-title mt-4 mb-2 text-3xl font-semibold uppercase'>
        Account Details
      </h1>
      <form id=''>
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
};

export default UserDetails;
