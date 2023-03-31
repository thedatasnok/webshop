import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import environment from './env';
import SignUpConfirmation from './mails/SignUpConfirmation';

const transporter = nodemailer.createTransport({
  host: environment.hostname,
  port: environment.port,
  secure: true,
  auth: {
    user: environment.username,
    pass: environment.password,
  },
});

const emailHtml = render(<SignUpConfirmation />);

const options = {
  from: environment.sender,
  to: '',
  subject: 'Thanks for signing up to CGG!',
  html: emailHtml,
};

// transporter.sendMail(options);
