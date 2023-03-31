import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Tailwind,
  Text,
} from '@react-email/components';

// @ts-ignore - can't infer type based off JSDoc comment it seems
import tailwindConfig from '@webshop/ui/tailwind.config.cjs';

interface SignUpConfirmationProps {}

/**
 *
 * @param
 * @returns
 */
const SignUpConfirmation: React.FC<SignUpConfirmationProps> = () => {
  return (
    <Html lang='en'>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='text-base-50 bg-base-900 mx-auto my-auto py-32'>
          <Container className='border-base-400 bg-base-800 my-32 flex flex-col items-center rounded-sm border'>
            <Text className='font-semibold bg-transparent'>
              Thanks for signing up to Cyberpunk Gaming Gear!
            </Text>
            <Button className='bg-primary text-base-900 rounded-md px-2 py-1 text-sm font-semibold'>
              Start shopping
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SignUpConfirmation;
