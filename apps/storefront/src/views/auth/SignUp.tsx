import PasswordStrength from '@/components/auth/PasswordStrength';
import { RouteHref } from '@/router';
import { useForm, zodResolver } from '@mantine/form';
import { SignUpRequest } from '@webshop/contracts';
import {
  Alert,
  AlertLevel,
  Button,
  ErrorLabel,
  InputLabel,
  Logo,
  MINIMUM_ENTROPY_BITS,
  PasswordStrengthCode,
  TextField,
  usePasswordStrength,
  useSignUpMutation,
} from '@webshop/ui';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';

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
    passwordStrength: z.object({
      strengthCode: z.enum(['REASONABLE', 'STRONG', 'VERY_STRONG']),
      lengthSatisfied: z.literal(true),
      lowercaseSatisfied: z.literal(true),
      uppercaseSatisfied: z.literal(true),
      numberSatisfied: z.literal(true),
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp, { isError }] = useSignUpMutation();

  const handleSubmit = async (values: SignUpRequest) => {
    try {
      await signUp(values).unwrap();
      navigate(RouteHref.PROFILE);
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
      passwordStrength: {
        strengthCode: 'VERY_WEAK' as PasswordStrengthCode,
        lengthSatisfied: false,
        lowercaseSatisfied: false,
        uppercaseSatisfied: false,
        numberSatisfied: false,
        strengthSatisfied: false,
      },
    },
  });

  const strength = usePasswordStrength(form.values.password);

  useEffect(() => {
    const { strength: strengthCode, charsets, length, entropy } = strength;

    form.setFieldValue('passwordStrength', {
      strengthCode: strengthCode satisfies PasswordStrengthCode,
      lengthSatisfied: length > 10,
      lowercaseSatisfied: charsets.lowercase,
      uppercaseSatisfied: charsets.uppercase,
      numberSatisfied: charsets.numbers,
      strengthSatisfied: entropy >= MINIMUM_ENTROPY_BITS,
    });
  }, [strength]);

  return (
    <div>
      <main>
        <div className='flex h-screen flex-col items-center justify-center'>
          <NavLink title='Home' to={RouteHref.HOME} className='w-32 pb-10'>
            <Logo variant='small' />
          </NavLink>

          <form
            id='sign-up-form'
            className='flex w-64 flex-col gap-2'
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <h1 className='font-title text-center text-2xl font-semibold uppercase'>
              Sign up
            </h1>

            <p className='-mt-2 text-center'>
              Or{' '}
              <NavLink
                to={RouteHref.SIGN_IN}
                className='text-primary hover:underline'
              >
                sign in
              </NavLink>{' '}
              if you already registered
            </p>

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
              <InputLabel htmlFor='name'>Name</InputLabel>
              <TextField id='name' {...form.getInputProps('fullName')} />
              {form.errors.fullName && (
                <ErrorLabel text={form.errors.fullName as string} />
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

            <div>
              <InputLabel htmlFor='password-confirmation'>
                Confirm password
              </InputLabel>
              <TextField
                id='password-confirmation'
                type='password'
                {...form.getInputProps('passwordConfirmation')}
              />
              {form.errors.passwordConfirmation && (
                <ErrorLabel text={form.errors.passwordConfirmation as string} />
              )}
            </div>

            <PasswordStrength
              strength={form.values.passwordStrength.strengthCode}
              requirements={[
                {
                  label: 'At least 10 characters',
                  satisfied: form.values.passwordStrength.lengthSatisfied,
                },
                {
                  label: 'At least 1 lowercase character',
                  satisfied: form.values.passwordStrength.lowercaseSatisfied,
                },
                {
                  label: 'At least 1 uppercase character',
                  satisfied: form.values.passwordStrength.uppercaseSatisfied,
                },
                {
                  label: 'At least 1 number',
                  satisfied: form.values.passwordStrength.numberSatisfied,
                },
                {
                  label: 'Password is strong enough',
                  satisfied: form.values.passwordStrength.strengthSatisfied,
                },
                {
                  label: 'Passwords match',
                  satisfied:
                    form.values.passwordConfirmation === form.values.password,
                },
              ]}
            />

            <Alert
              show={isError}
              level={AlertLevel.ERROR}
              message='Something went wrong, please verify your input and try again. If the problem persists, please contact support.'
            />

            <Button className='w-full' type='submit'>
              Sign up
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
