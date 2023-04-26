import PasswordStrength from '@/components/auth/PasswordStrength';
import { Disclosure } from '@headlessui/react';
import { useForm, zodResolver } from '@mantine/form';
import { UpdateUserProfileRequest } from '@webshop/contracts';
import {
  Button,
  DialogPrompt,
  ErrorLabel,
  InputLabel,
  PasswordStrengthCode,
  TextField,
  useAuth,
  useDeleteUserProfileMutation,
  usePasswordStrength,
  useSignOutMutation,
  useUpdateUserProfileMutation,
} from '@webshop/ui';
import clsx from 'clsx';
import { forwardRef, useEffect, useId, useState } from 'react';
import {
  RiArrowUpSLine,
  RiDeleteBin6Line,
  RiLogoutBoxLine,
} from 'react-icons/ri';
import { z } from 'zod';

export interface UserDetailsProps {
  className?: string;
}

const UserDetails = forwardRef<HTMLDivElement, UserDetailsProps>(
  ({ className }, ref) => {
    const [signOut] = useSignOutMutation();
    const [updateUserProfile] = useUpdateUserProfileMutation();
    const [deleteUserProfile] = useDeleteUserProfileMutation();

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

    const form = useForm({
      validate: zodResolver(schema),
      initialValues: {
        email: tokenDetails?.username || '',
        fullName: tokenDetails?.fullName || '',
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

    const formId = useId();

    // input field ids
    const emailId = useId();
    const nameId = useId();
    const newPasswordId = useId();
    const confirmNewPasswordId = useId();

    const [showPasswordStrength, setShowPasswordStrength] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    function handlePasswordFieldClick() {
      setShowPasswordStrength(true);
    }

    function handleDeleteUserProfile() {
      signOut();
      deleteUserProfile();
    }

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
              onClick={handlePasswordFieldClick}
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
              onClick={handlePasswordFieldClick}
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

          {showPasswordStrength && (
            <div className='mt-4'>
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
            </div>
          )}
        </form>

        <Disclosure>
          <Disclosure.Button className='text-base-400 ui-open:text-base-50 mt-4 flex flex-row items-center gap-1'>
            <p className='font-title'>extra options</p>
            <RiArrowUpSLine className='ui-open:rotate-180 transform' />
          </Disclosure.Button>

          <Disclosure.Panel>
            <div className='flex w-fit flex-col gap-2 pt-2'>
              <Button
                type='button'
                onClick={() => setDeleteOpen(true)}
                style='outline'
                variant='destructive'
              >
                <RiDeleteBin6Line />
                <p>Delete user profile</p>
              </Button>
            </div>
          </Disclosure.Panel>
        </Disclosure>

        <DialogPrompt
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          title='delete user account'
          message='This will permanently delete your user account.'
          action={handleDeleteUserProfile}
        />
      </div>
    );
  }
);

export default UserDetails;
