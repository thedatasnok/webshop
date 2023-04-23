import {
  useUpdateUserProfileMutation,
  Button,
  TextField,
  useSignOutMutation,
  ErrorLabel,
  InputLabel,
  useAuth,
} from '@webshop/ui';
import { useForm, zodResolver } from '@mantine/form';
import { UpdateUserProfileRequest } from '@webshop/contracts';
import { forwardRef, useId } from 'react';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { z } from 'zod';
import clsx from 'clsx';

export interface UserDetailsProps {
  className?: string;
}

const UserDetails = forwardRef<HTMLDivElement, UserDetailsProps>(
  ({ className }, ref) => {
    const [signOut] = useSignOutMutation();
    const [updateUserProfile] = useUpdateUserProfileMutation();

    const handleSubmit = async (values: UpdateUserProfileRequest) => {
      try {
        await updateUserProfile(values).unwrap();
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    const { tokenDetails } = useAuth();

    const schema = z
      .object({
        email: z.string().email({ message: 'Invalid email' }),
        fullName: z
          .string()
          .min(2, { message: 'Name should have at least 2 letters' }),
        password: z
          .string()
          .min(10, {
            message: 'Password should contain atleast 10 characters',
          })
          .nullable(),
        passwordConfirmation: z.string().nullable(),
      })
      .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ['passwordConfirmation'],
      });

    const form = useForm({
      validate: zodResolver(schema),
      initialValues: {
        email: tokenDetails?.username || '',
        fullName: tokenDetails?.fullName || '',
        password: '',
        passwordConfirmation: '',
      },
    });

    const formId = useId();

    // input field ids
    const emailId = useId();
    const nameId = useId();
    const newPasswordId = useId();
    const confirmNewPasswordId = useId();

    return (
      <div ref={ref} className={clsx(className)}>
        <h1 className='font-title mb-2 hidden text-2xl font-semibold uppercase md:block'>
          Account Details
        </h1>
        <form
          id={formId}
          className='mt-4 md:mt-0'
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <div>
            <InputLabel htmlFor={emailId}>Email</InputLabel>
            <TextField
              id={emailId}
              type='email'
              {...form.getInputProps('email')}
            />
            {form.errors.email && (
              <ErrorLabel text={form.errors.email as string} />
            )}
          </div>

          <div>
            <InputLabel htmlFor={nameId}>Name</InputLabel>
            <TextField id={nameId} {...form.getInputProps('fullName')} />
            {form.errors.fullName && (
              <ErrorLabel text={form.errors.fullName as string} />
            )}
          </div>

          <div>
            <InputLabel htmlFor={newPasswordId}>New password</InputLabel>
            <TextField
              id={newPasswordId}
              type='password'
              {...form.getInputProps('password')}
            />
            {form.errors.password && (
              <ErrorLabel text={form.errors.password as string} />
            )}
          </div>

          <div>
            <InputLabel htmlFor={confirmNewPasswordId}>
              Confirm new password
            </InputLabel>
            <TextField
              id={confirmNewPasswordId}
              type='password'
              {...form.getInputProps('passwordConfirmation')}
            />
            {form.errors.passwordConfirmation && (
              <ErrorLabel text={form.errors.passwordConfirmation as string} />
            )}
          </div>

          <div className='mt-2 flex justify-between gap-4'>
            <Button
              type='button'
              onClick={signOut}
              style='outline'
              variant='destructive'
            >
              <RiLogoutBoxLine className='-ml-1' />
              <p>Sign out</p>
            </Button>

            <Button type='submit'>Save</Button>
          </div>
        </form>
      </div>
    );
  }
);

export default UserDetails;
