import { Button, TextField } from '@webshop/ui';
import clsx from 'clsx';

export interface UserDetailsProps {
  className?: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ className }) => {
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

        <Button className='text-primary border-primary rounded-sm border bg-transparent px-4 mt-2'>
          Change password
        </Button>
      </form>
    </div>
  );
};

export default UserDetails;
