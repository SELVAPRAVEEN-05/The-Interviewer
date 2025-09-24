
import fastify from './src/middleware/jwt';
import {  LoginUserRoute } from './src/routes/auth';
import { InstituteRoute } from './src/routes/institute';

fastify.get('/',{
            preHandler: [fastify.authenticate],
        }, async (request:any, reply:any) => {
  return { hello: 'world' }
})
fastify.get('/jwt', async (request:any, reply:any) => {
  console.log("Hi")
  return reply.status(200).send({ hello: 'world' })
})
fastify.register(LoginUserRoute,{prefix:"/api/auth"})
fastify.register(InstituteRoute,{prefix:"/api/institute"})

const start = async () => {
  try {
    await fastify.listen({ port: 5000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()