import { z } from 'zod';
import SignUpConfirmation from '../../SignUpConfirmation';
import { defineMailEndpoint, genericMailSchema } from '../lib';

const propsSchema = genericMailSchema.extend({});

export type SignUpConfirmationProps = z.infer<typeof propsSchema>;

export default defineMailEndpoint({
  url: '/mails/sign-up-confirmation',
  validator: propsSchema,
  subject: 'Thanks for signing up to Cyberpunk Gaming Gear!',
  render: SignUpConfirmation,
});
