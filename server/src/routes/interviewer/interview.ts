import { FastifyInstance } from "fastify";
import { interviewUpdateController } from "../../controllers/interviewer/interview";

const InterviewerInterviewRoute = (fastify: FastifyInstance) => {
  fastify.put('/:interviewId', { preHandler: [fastify.authenticateAdmin] }, interviewUpdateController);
};

export default InterviewerInterviewRoute;
