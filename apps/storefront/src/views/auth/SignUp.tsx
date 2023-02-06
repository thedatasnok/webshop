import Header from '@/components/layout/Header';
import { Button, Logo } from '@webshop/ui';

const SignUp = () => {
  return (
    <div>
      <Header />

      <main>
        <div className='flex flex-col items-center justify-center mx-auto py-10'>
          <div className='w-32 pb-10'>
            <Logo variant='small' />
          </div>

          <form id='sign-up-form'>
            <div className='text-3xl flex justify-center'>
              <h1>Sign up</h1>
            </div>

            <div>
              <label>E-mail</label>
              <input
                id='email'
                type='text'
                className='w-full bg-base-800 focus:outline-none rounded-sm p-1'
                aria-label='Search'
              />
            </div>

            <div className='py-1'>
              <label>Name</label>
              <input
                id='name'
                type='text'
                className='w-full bg-base-800 focus:outline-none rounded-sm p-1'
                aria-label='Search'
              />
            </div>

            <div className='py-1'>
              <label>Password</label>
              <input
                id='password'
                type='password'
                className='w-full bg-base-800 focus:outline-none rounded-sm p-1'
                aria-label='Search'
              />
            </div>

            <div className='py-1'>
              <label>Confirm password</label>
              <input
                id='confirm-password'
                type='password'
                className='w-full bg-base-800 focus:outline-none rounded-sm p-1'
                aria-label='Search'
              />
            </div>

            <div id='sign-up-button' className='py-5 text-3xl rounded-sm'>
              <Button className='w-full'>Sign up</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
