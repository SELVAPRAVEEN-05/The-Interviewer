import { FastifyInstance } from "fastify";
import { interviewScheduleController } from "../controllers/candidate/interview";

export const interviewer = (fastify: FastifyInstance) => {
    fastify.post('/', { preHandler: fastify.authenticateAdmin }, interviewScheduleController)
}