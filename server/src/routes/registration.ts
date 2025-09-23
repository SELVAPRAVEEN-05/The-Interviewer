import { FastifyInstance } from "fastify";
import { CandidateRegistrationController } from "../controllers/registerController";

export const Registration=async (fastify:FastifyInstance)=>{
fastify.post('/candidate',CandidateRegistrationController)
}