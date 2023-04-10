import {
  useUpdateUserProfileMutation,
  Button,
  TextField,
  useSignOutMutation,
  ErrorLabel,
  InputLabel,
} from '@webshop/ui';
import { useForm, zodResolver } from '@mantine/form';
import { UpdateUserProfileRequest } from '@webshop/contracts';
import { forwardRef, useState } from 'react';
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

    const [showChangePasswordFields, setShowChangePasswordFields] =
      useState(false);

    function handleChangePasswordClick() {
      setShowChangePasswordFields((prevState) => !prevState);
    }

    const schema = z
      .object({
        email: z.string().email({ message: 'Invalid email' }),
        fullName: z
          .string()
          .min(2, { message: 'Name should have at least 2 letters' }),
        password: z.string().min(10, {
          message: 'Password should contain atleast 10 characters',
        }),
        passwordConfirmation: z.string(),
      })
      .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ['passwordConfirmation'],
      });

    const form = useForm({
      validate: zodResolver(schema),
      initialValues: {
        email: '',
        fullName: '',
        password: '',
        passwordConfirmation: '',
      },
    });

    //TODO: allow submission of empty pw fields
    return (
      <div ref={ref} className={clsx(className)}>
        <h1 className='font-title mb-2 mt-4 hidden text-3xl font-semibold uppercase md:block'>
          Account Details
        </h1>
        <form
          id='update-profile-form'
          className='mt-4 md:mt-0'
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <div>
            <InputLabel>Email</InputLabel>
            <TextField type='email' {...form.getInputProps('email')} />
            {form.errors.email && (
              <ErrorLabel text={form.errors.email as string} />
            )}
          </div>

          <div>
            <InputLabel>Name</InputLabel>
            <TextField {...form.getInputProps('fullName')} />
            {form.errors.fullName && (
              <ErrorLabel text={form.errors.fullName as string} />
            )}
          </div>

          {showChangePasswordFields && (
            <div>
              <div>
                <InputLabel>Password</InputLabel>
                <TextField
                  type='password'
                  {...form.getInputProps('password')}
                />
                {form.errors.password && (
                  <ErrorLabel text={form.errors.password as string} />
                )}
              </div>

              <div>
                <InputLabel>Confirm password</InputLabel>
                <TextField
                  type='password'
                  {...form.getInputProps('passwordConfirmation')}
                />
                {form.errors.passwordConfirmation && (
                  <ErrorLabel
                    text={form.errors.passwordConfirmation as string}
                  />
                )}
              </div>
            </div>
          )}

          <div className='mt-2 flex justify-between gap-4'>
            <Button
              className={clsx(
                'text-primary border-primary rounded-sm border bg-transparent px-4',
                showChangePasswordFields && 'invisible'
              )}
              onClick={handleChangePasswordClick}
              type='button'
            >
              Change password
            </Button>
            <Button type='submit'>Save</Button>
          </div>
        </form>

        <button
          onClick={() => signOut()}
          className='border-error text-error mt-2 flex items-center gap-0.5 rounded-sm border bg-transparent px-2 py-1 pr-2.5'
        >
          <RiLogoutBoxLine />
          <p>Sign out</p>
        </button>
      </div>
    );
  }
);

export default UserDetails;
