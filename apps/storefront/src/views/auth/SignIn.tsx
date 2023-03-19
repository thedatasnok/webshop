import { Button, ErrorLabel, InputLabel, Logo, TextField } from '@webshop/ui';
import { NavLink, useNavigate } from 'react-router-dom';

import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useSignInMutation } from '@/services/auth';
import { SignInRequest } from '@webshop/contracts';
import { RouteHref } from '@/router';

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
      navigate(RouteHref.PROFILE);
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
            <NavLink to={RouteHref.HOME} className='flex w-32 items-center'>
              <Logo variant='small' />
            </NavLink>
          </div>

          <form
            id='sign-in-form'
            className='flex w-64 flex-col gap-2'
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <h1 className='font-title text-center text-2xl font-semibold uppercase'>
              Sign in
            </h1>

            <p className='-mt-2 text-center'>
              Or{' '}
              <NavLink
                to={RouteHref.SIGN_UP}
                className='text-primary hover:underline'
              >
                sign up
              </NavLink>{' '}
              for a free account
            </p>

            <div>
              <InputLabel>Email</InputLabel>
              <TextField {...form.getInputProps('email')} />
              {form.errors.email && <ErrorLabel text={form.errors.email as string} />}
            </div>

            <div>
              <InputLabel>Password</InputLabel>
              <TextField type='password' {...form.getInputProps('password')} />
              {form.errors.password && <ErrorLabel text={form.errors.password as string} />}
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
