import { Button, Logo, TextField } from '@webshop/ui';
import { NavLink, useNavigate } from 'react-router-dom';

import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useSignUpMutation } from '@/services/auth';
import { SignUpRequest } from '@webshop/contracts';

const schema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Name should have at least 2 letters' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(10, { message: 'Password should contain atleast 10 characters' }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();

  const handleSubmit = async (values: SignUpRequest) => {
    try {
      await signUp(values).unwrap();
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      passwordConfirmation: '',
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
            id='sign-up-form'
            className='flex flex-col gap-2'
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <div className='flex justify-center text-3xl'>
              <h1>Sign up</h1>
            </div>

            <div>
              <label>E-mail</label>
              <TextField {...form.getInputProps('email')} />
              <p>{form.errors.email}</p>
            </div>

            <div>
              <label>Name</label>
              <TextField {...form.getInputProps('fullName')} />
              <p>{form.errors.fullName}</p>
            </div>

            <div>
              <label>Password</label>
              <TextField type='password' {...form.getInputProps('password')} />
              <p>{form.errors.password}</p>
            </div>

            <div>
              <label>Confirm password</label>
              <TextField
                type='password'
                {...form.getInputProps('passwordConfirmation')}
              />
              <p>{form.errors.passwordConfirmation}</p>
            </div>

            <div id='sign-up-button' className='my-2'>
              <Button className='w-full rounded-sm text-2xl' type='submit'>
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
