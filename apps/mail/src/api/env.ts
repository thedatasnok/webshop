import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

/**
 * Schema for validatinge environment variables.
 */
const environmentSchema = z.object({
  hostname: z.string(),
  port: z.string().transform((port) => parseInt(port)),
  username: z.string(),
  password: z.string(),
  sender: z.string().email(),
});

const environment = environmentSchema.parse({
  hostname: process.env.MAIL_SERVER_HOSTNAME,
  port: process.env.MAIL_SERVER_PORT,
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,
  sender: process.env.MAIL_SENDER,
});

export default environment;
