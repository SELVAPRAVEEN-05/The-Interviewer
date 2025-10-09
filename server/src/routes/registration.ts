import { FastifyInstance } from "fastify";
import { CandidateRegistrationController, InterviewerRegistrationController } from "../controllers/registerController";

export const Registration=async (fastify:FastifyInstance)=>{
fastify.post('/candidate',CandidateRegistrationController)
fastify.post('/interviewer',InterviewerRegistrationController)

}