import fastify from 'fastify';
import { mail } from './lib';

const server = fastify({});

// could potentially check that the authentication has not failed
server.get('/health', () => ({ status: 'UP' }));

server.register(mail);

server.listen({
  host: '0.0.0.0',
  port: 4000,
});
