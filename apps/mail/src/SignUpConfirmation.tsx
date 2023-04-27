import { Button, Container, Img, Text } from '@react-email/components';
import BaseMail from './BaseMail';
import { SignUpConfirmationProps } from './api/endpoints/signUpConfirmation';
import environment from './api/env';

const SignUpConfirmation: React.FC<SignUpConfirmationProps> = () => {
  return (
    <BaseMail preview='Thanks for signing up to Cyberpunk Gaming Gear!'>
      <Container className='my-32 bg-black text-center'>
        <Img
          src='https://cgg-webshop-assets.s3.eu-north-1.amazonaws.com/images/branding/logo-big.png'
          className='mx-auto w-1/2'
        />

        <Text className='bg-transparent font-semibold'>
          Thanks for signing up to Cyberpunk Gaming Gear!
        </Text>

        <Button
          href={`https://${environment.hostname}`}
          className='mb-4 font-semibold text-zinc-300'
        >
          Start shopping
        </Button>
      </Container>
    </BaseMail>
  );
};

export default SignUpConfirmation;
