
import fastify from './src/middleware/jwt';
import { AdminDashboardRoute } from './src/routes/admin/admin';
import {  LoginUserRoute } from './src/routes/auth';
import { CandidateDashboardRoute } from './src/routes/candidate/dashboard';
import { interviewer } from './src/routes/interviewer';
import { Registration } from './src/routes/registration';
import { Skill } from './src/routes/skill';
import { profile } from './src/routes/user';
fastify.get('/',{
            preHandler: [fastify.authenticateAdmin],
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
fastify.register(profile,{prefix:"/api/user"})
fastify.register(interviewer,{prefix:"/api/interviewer"})
fastify.register(CandidateDashboardRoute,{prefix:"/api/candidate"})

const start = async () => {
  try {
    await fastify.listen({ port: 5000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()