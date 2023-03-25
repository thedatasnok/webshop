import { Logo, useSignOutMutation } from '@webshop/ui';
import { RiLogoutBoxLine } from 'react-icons/ri';

const Forbidden = () => {
  const [signOut] = useSignOutMutation();

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <main className='flex w-1/6 flex-col items-center text-center'>
        <Logo variant='big' className='w-3/4' />

        <h1 className='font-title mt-4 text-2xl font-semibold uppercase tracking-widest'>
          403 Forbidden
        </h1>

        <p className='text-base-200 text-sm'>
          Sorry, you do not have the required permission to access this
          resource.
        </p>

        <p className='text-base-200 mt-2 text-sm'>
          If you want, you can attempt using another user account.
        </p>

        <button
          onClick={() => signOut()}
          className='font-title border-base-400 hover:border-base-300 text-base-300 hover:text-base-100 mt-2 flex items-center justify-center gap-1 rounded-sm border py-0.5 pl-1.5 pr-2 uppercase'
        >
          <RiLogoutBoxLine className='h-4 w-4' />
          <p className='mt-px'>Sign out</p>
        </button>
      </main>
    </div>
  );
};

export default Forbidden;
