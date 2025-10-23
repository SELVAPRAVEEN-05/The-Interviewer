import { FastifyInstance, FastifyRegister } from "fastify";

import { interviewerController, interviewHistoryController, interviewUpcomingController } from "../../controllers/interviewer/dashboard";
import { SelectedController } from "../../controllers/interviewer/interview";

const InterviewerDashboardRoute = (fastify: FastifyInstance) => {
  fastify.get('/upcoming', { preHandler: [fastify.authenticateAdmin] }, interviewUpcomingController)
  fastify.get('/dashboard', { preHandler: [fastify.authenticateAdmin] }, interviewerController)
  fastify.get('/history', { preHandler: [fastify.authenticateAdmin] }, interviewHistoryController)
  fastify.put('/selected', { preHandler: [fastify.authenticateAdmin] }, SelectedController)

}

export default InterviewerDashboardRoute;