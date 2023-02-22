import { Button, Logo } from '@webshop/ui';
import { NavLink } from 'react-router-dom';

const SignUp = () => {
  return (
    <div>
      <main>
        <div className='flex h-screen flex-col items-center justify-center'>
          <div className='w-32 pb-10'>
            <NavLink to='/' className='flex w-32 items-center'>
              <Logo variant='small' />
            </NavLink>
          </div>

          <form id='sign-up-form' className='flex flex-col gap-2'>
            <div className='flex justify-center text-3xl'>
              <h1>Sign up</h1>
            </div>

            <div>
              <label>E-mail</label>
              <input
                id='email'
                type='text'
                className='bg-base-800 w-full rounded-sm p-1 focus:outline-none'
                aria-label='Search'
              />
            </div>

            <div>
              <label>Name</label>
              <input
                id='name'
                type='text'
                className='bg-base-800 w-full rounded-sm p-1 focus:outline-none'
                aria-label='Search'
              />
            </div>

            <div>
              <label>Password</label>
              <input
                id='password'
                type='password'
                className='bg-base-800 w-full rounded-sm p-1 focus:outline-none'
                aria-label='Search'
              />
            </div>

            <div>
              <label>Confirm password</label>
              <input
                id='confirm-password'
                type='password'
                className='bg-base-800 w-full rounded-sm p-1 focus:outline-none'
                aria-label='Search'
              />
            </div>

            <div id='sign-up-button' className='my-2'>
              <NavLink to='/'>
                <Button className='w-full rounded-sm text-2xl'>Sign up</Button>
              </NavLink>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
