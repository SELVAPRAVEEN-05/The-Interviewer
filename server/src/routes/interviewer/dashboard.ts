import { FastifyInstance, FastifyRegister } from "fastify";

import { interviewerController, interviewUpcomingController } from "../../controllers/interviewer/dashboard";

const InterviewerDashboardRoute = (fastify: FastifyInstance) => {
  fastify.get('/upcoming', { preHandler: [fastify.authenticateAdmin] }, interviewUpcomingController)
  fastify.get('/dashboard', { preHandler: [fastify.authenticateAdmin] }, interviewerController)
}

export default InterviewerDashboardRoute;