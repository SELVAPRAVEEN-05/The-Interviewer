
import { profileUpload } from './src/lib/storage';
import fastify from './src/middleware/jwt';
import { AdminDashboardRoute } from './src/routes/admin/admin';
import { LoginUserRoute } from './src/routes/auth';
import { CandidateDashboardRoute } from './src/routes/candidate/dashboard';
import { interviewer } from './src/routes/interviewer';
import InterviewerDashboardRoute from './src/routes/interviewer/dashboard';
import InterviewerInterviewRoute from './src/routes/interviewer/interview';
import { Registration } from './src/routes/registration';
import { Skill } from './src/routes/skill';
import { EducationRoute } from './src/routes/education';
import { InstituteRoute } from './src/routes/institute';
import { BrandRoute } from './src/routes/brand';
import { PositionRoute } from './src/routes/position';
import { profile } from './src/routes/user';
import multipart from '@fastify/multipart';
import prisma from './src/lib/prisma';
fastify.get('/', async (request:any, reply:any) => {
  return await prisma.language.findMany();
})
fastify.get('/jwt',  { preHandler: [fastify.authenticateAdmin] }, async (request:any, reply:any) => {
  console.log("Hi")
  return reply.status(200).send({ hello: 'world' })
})
fastify.post(
  '/upload',
  { preHandler: profileUpload.single('file') },
  async (req, reply) => {
    // `req.file` is available here
    reply.send({ message: 'File uploaded successfully', file: req.file });
  }
);

fastify.register(LoginUserRoute,{prefix:"/api/auth"})
fastify.register(Skill,{prefix:"/api/skill"})
fastify.register(EducationRoute,{prefix:"/api/education"})
fastify.register(Registration,{prefix:"/api/register"})
fastify.register(AdminDashboardRoute,{prefix:"/api/admin"})
fastify.register(profile,{prefix:"/api/user"})
fastify.register(interviewer,{prefix:"/api/interview"})
fastify.register(CandidateDashboardRoute,{prefix:"/api/candidate"})
fastify.register(InterviewerDashboardRoute,{prefix:"/api/interviewer"})
fastify.register(InterviewerInterviewRoute,{prefix:"/api/interview"})
fastify.register(InstituteRoute,{prefix:"/api/institute"})
fastify.register(BrandRoute,{prefix:"/api/brand"})
fastify.register(PositionRoute,{prefix:"/api/position"})
const start = async () => {
  try {
    await fastify.listen({ port: 5001 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()