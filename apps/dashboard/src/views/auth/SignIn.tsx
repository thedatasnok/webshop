import { RouteHref } from '@/router/enum';
import { useForm, zodResolver } from '@mantine/form';
import { SignInRequest } from '@webshop/contracts';
import {
  Alert,
  AlertLevel,
  Button,
  ErrorLabel,
  InputLabel,
  Logo,
  TextField,
  useSignInMutation,
} from '@webshop/ui';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string(),
});

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn, { isError, isLoading }] = useSignInMutation();

  const handleSubmit = async (values: SignInRequest) => {
    try {
      await signIn(values).unwrap();
      navigate(RouteHref.DASHBOARD);
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
            <Logo variant='small' />
          </div>

          <form
            id='sign-in-form'
            className='flex w-64 flex-col gap-2'
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <h1 className='font-title text-center text-2xl font-semibold uppercase'>
              Sign in
            </h1>

            <div>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <TextField
                id='email'
                type='email'
                {...form.getInputProps('email')}
              />
              {form.errors.email && (
                <ErrorLabel text={form.errors.email as string} />
              )}
            </div>

            <div>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <TextField
                id='password'
                type='password'
                {...form.getInputProps('password')}
              />
              {form.errors.password && (
                <ErrorLabel text={form.errors.password as string} />
              )}
            </div>

            <Alert
              level={AlertLevel.ERROR}
              show={isError}
              message='Sign in failed, please verify your credentials.'
            />

            <Button className='w-full' type='submit' isLoading={isLoading}>
              Sign in
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
