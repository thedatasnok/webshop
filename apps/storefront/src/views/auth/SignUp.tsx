import PasswordStrength from '@/components/auth/PasswordStrength';
import { useSignUpMutation } from '@/services/auth';
import { useForm, zodResolver } from '@mantine/form';
import { SignUpRequest } from '@webshop/contracts';
import {
  Button,
  Logo,
  PasswordStrengthCode,
  TextField,
  usePasswordStrength,
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
      passwordStrength: {
        strengthCode: 'VERY_WEAK' as PasswordStrengthCode,
        lengthSatisfied: false,
        lowercaseSatisfied: false,
        uppercaseSatisfied: false,
        numberSatisfied: false,
      },
    },
  });

  const strength = usePasswordStrength(form.values.password);

  useEffect(() => {
    const { strength: strengthCode, charsets, length } = strength;

    form.setFieldValue('passwordStrength', {
      strengthCode: strengthCode satisfies PasswordStrengthCode,
      lengthSatisfied: length > 10,
      lowercaseSatisfied: charsets.lowercase,
      uppercaseSatisfied: charsets.uppercase,
      numberSatisfied: charsets.numbers,
    });
  }, [strength]);

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
                  label: 'Passwords match',
                  satisfied:
                    form.values.passwordConfirmation === form.values.password,
                },
              ]}
            />

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
