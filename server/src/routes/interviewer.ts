import { FastifyInstance } from "fastify";
import { interviewFeedbackController, interviewScheduleController } from "../controllers/candidate/interview";

export const interviewer = (fastify: FastifyInstance) => {
    fastify.post('/', { preHandler: fastify.authenticateAdmin }, interviewScheduleController)
    fastify.post('/feedback', { preHandler: fastify.authenticateAdmin }, interviewFeedbackController)
}