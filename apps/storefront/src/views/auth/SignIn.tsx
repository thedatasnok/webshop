import { Button, Logo, TextField } from '@webshop/ui';
import { NavLink, useNavigate } from 'react-router-dom';

import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useSignInMutation } from '@/services/auth';
import { SignInRequest } from '@webshop/contracts';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string(),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();

  const handleSubmit = async (values: SignInRequest) => {
    try {
      await signIn(values).unwrap();
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div>
      <main>
        <div className='flex h-screen flex-col items-center justify-center'>
          <div className='w-32 pb-10'>
            <NavLink to='/' className='flex w-32 items-center'>
              <Logo variant='small' />
            </NavLink>
          </div>

          <form
            id='sign-in-form'
            className='flex flex-col gap-2'
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <div className='flex justify-center text-3xl'>
              <h1>Sign in</h1>
            </div>

            <div>
              <label>E-mail</label>
              <TextField {...form.getInputProps('email')} />
              <p>{form.errors.email}</p>
            </div>

            <div>
              <label>Password</label>
              <TextField type='password' {...form.getInputProps('password')} />
              <p>{form.errors.password}</p>
            </div>

            <div id='sign-in-button' className='my-2'>
              <Button className='w-full rounded-sm text-2xl' type='submit'>
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
