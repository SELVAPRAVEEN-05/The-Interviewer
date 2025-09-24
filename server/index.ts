
import fastify from './src/middleware/jwt';
import { AdminDashboardRoute } from './src/routes/admin/admin';
import {  LoginUserRoute } from './src/routes/auth';
import { Registration } from './src/routes/registration';
import { Skill } from './src/routes/skill';

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
fastify.register(Skill,{prefix:"/api/skill"})
fastify.register(Registration,{prefix:"/api/register"})
fastify.register(AdminDashboardRoute,{prefix:"/api/admin"})

const start = async () => {
  try {
    await fastify.listen({ port: 5000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()