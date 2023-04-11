import fastify from 'fastify';
import { registerEndpoint } from './lib';
import signUpConfirmation from './endpoints/signUpConfirmation';
import orderConfirmation from './endpoints/orderConfirmation';

const server = fastify({
  logger: true,
});

export type Server = typeof server;

// could potentially check that the authentication has not failed
server.get('/health', () => ({ status: 'UP' }));

registerEndpoint(server, signUpConfirmation);
registerEndpoint(server, orderConfirmation);

server.listen({
  host: '0.0.0.0',
  port: 4000,
});

export { server };
