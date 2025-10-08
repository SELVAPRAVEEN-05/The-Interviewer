import { FastifyInstance, FastifyRegister } from "fastify";

import { interviewerController } from "../../controllers/interviewer/dashboard";

const InterviewerDashboardRoute = (fastify: FastifyInstance) => {
  fastify.get('/dashboard', { preHandler: [fastify.authenticateAdmin] }, interviewerController)
}

export default InterviewerDashboardRoute;