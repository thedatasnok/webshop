import { render } from '@react-email/render';
import { FastifyPluginCallback } from 'fastify';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import environment from './env';

export const genericMailSchema = z.object({
  to: z.string().email(),
});

export type GenericMailOptions = z.infer<typeof genericMailSchema>;

export interface MailEndpoint<T extends GenericMailOptions> {
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

const transporter = nodemailer.createTransport({
  host: environment.hostname,
  port: environment.port,
  secure: true,
  auth: {
    user: environment.username,
    pass: environment.password,
  },
});

export const mail: FastifyPluginCallback = async (server, _opts, done) => {
  Object.values(await import('@/mails')).forEach(
    ({ url, subject, validator, render: Mail }) => {
      server.post(url, async (request, reply) => {
        try {
          const props = validator.parse(request.body);
          const html = render(<Mail {...props} />);

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
    }
  );

  done();
};
