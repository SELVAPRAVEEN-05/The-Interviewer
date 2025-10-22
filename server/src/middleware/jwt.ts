import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt, { JWT } from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import path from "path/win32";
const fastify = Fastify();

// Define the types for request user property
declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
   
  }
  export interface FastifyInstance {
    authenticateAdmin: any
  }
}
fastify.register(multipart);
fastify.register(fastifyStatic, {
  root: path.join(process.cwd(), 'uploads'),
  prefix: '/uploads/', // all files in /uploads can be viewed under this URL
});
// Register the cookie plugin first
fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET || 'some-secret-key',
  hook: 'onRequest', // Change to onRequest to ensure cookies are parsed early
});
fastify.register(cors, {
  origin: true, // Be careful in production - specify exact origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization',''],
  credentials:true
});
// Then register the JWT plugin
fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'imvinojan02061999xxxx',
  cookie: {
    cookieName: 'access_token',
    signed: false // Set to true if you want signed cookies
  }
});

fastify.decorate(
  'authenticateAdmin',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.headers['authorization'];
    
      if (!token) {
        throw new Error('No token provided');
      }
       const access_token = token.split(' ')[1];
       if (!access_token) {
        throw new Error('No token provided');
      }
      // Verify the token
      const decoded:any = fastify.jwt.verify(access_token);
      
      // Set the user in the request
      request.user = decoded;
      console.log("Decoded JWT:", decoded);
      // if(request.user?.role!=='ADMIN'){
      //   return reply.code(403).send({ 
      //     error: 'Forbidden', 
      //     message: 'You do not have permission to access this resource' 
      //   });
      // }
      
    } catch (err) {
      console.error('Authentication error:', err);
      reply.code(401).send({ 
        error: 'Unauthorized', 
        message: 'Invalid or expired token' 
      });
    }
  }
);

export default fastify;