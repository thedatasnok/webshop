import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import environment from './env';
import { Server } from './main';

export const genericMailSchema = z.object({
  to: z.string().email(),
});

/**
 * Shared options for all mail endpoints.
 */
export type GenericMailOptions = z.infer<typeof genericMailSchema>;

export interface MailEndpoint<T> {
  /**
   * The url that the mail endpoint will be registered at.
   */
  url: string;
  /**
   * The subject of the mail.
   */
  subject: ((props: T) => string) | string;
  /**
   * The validator for the incoming request.
   */
  validator: z.ZodSchema<T>;
  /**
   * React component that should be used to render the incoming request.
   */
  render: React.FC<T>;
}

export const defineMailEndpoint = <T extends GenericMailOptions>(
  endpoint: MailEndpoint<T>
) => endpoint;

/**
 * Nodemailer transport, used to send the rendered emails.
 */
const transporter = nodemailer.createTransport({
  host: environment.hostname,
  port: environment.port,
  secure: true,
  auth: {
    user: environment.username,
    pass: environment.password,
  },
});

/**
 * Utility function for registering an endpoint to the server.
 *
 * @param server the server to register the endpoint to
 * @param endpoint the endpoint to register
 */
export const registerEndpoint = <T extends GenericMailOptions>(
  server: Server,
  endpoint: MailEndpoint<T>
) => {
  server.post(endpoint.url, async (request, reply) => {
    const { validator, render: mail, subject } = endpoint;

    try {
      const props = validator.parse(request.body);
      const element = mail(props);

      if (!element) throw Error();

      const html = render(element);

      const mailSubject =
        typeof subject === 'function' ? subject(props) : subject;

      transporter.sendMail({
        from: environment.sender,
        to: props.to,
        subject: mailSubject,
        html,
      });

      return reply.status(200).send({
        statusCode: 200,
        code: 'SUCCESS',
        message: 'The mail was sent successfully.',
      });
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          statusCode: 400,
          code: 'INVALID_REQUEST',
          message: 'The request is invalid.',
          error,
        });
      }

      return reply.status(500).send({
        statusCode: 500,
        code: 'ERROR_SENDING_MAIL',
        message: 'Something went wrong while sending the mail.',
      });
    }
  });
};
