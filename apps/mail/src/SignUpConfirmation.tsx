import { Button, Container, Text } from '@react-email/components';
import BaseMail from './BaseMail';
import { SignUpConfirmationProps } from './api/endpoints/signUpConfirmation';

const SignUpConfirmation: React.FC<SignUpConfirmationProps> = () => {
  return (
    <BaseMail preview='Thanks for signing up to Cyberpunk Gaming Gear!'>
      <Container className='my-32 flex flex-col items-center rounded-sm border border-zinc-400 bg-zinc-800'>
        <Text className='bg-transparent font-semibold'>
          Thanks for signing up to Cyberpunk Gaming Gear!
        </Text>
        <Button className='rounded-md bg-blue-500 px-2 py-1 text-sm font-semibold text-zinc-900'>
          Start shopping
        </Button>
      </Container>
    </BaseMail>
  );
};

export default SignUpConfirmation;
