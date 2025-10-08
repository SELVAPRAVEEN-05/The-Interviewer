import { FastifyInstance, FastifyRegister } from "fastify";
import { DashboardController } from "../../controllers/candidate/dashboard";
import { candidateInterviewHistoryController,UpcomingInterviewsController } from "../../controllers/candidate/interviewFetch";

export const CandidateDashboardRoute=(fastify:FastifyInstance)=>{
fastify.get('/dashboard',{preHandler: [fastify.authenticateAdmin]},DashboardController)
fastify.get('/interviews-history',{preHandler: [fastify.authenticateAdmin]},candidateInterviewHistoryController)
fastify.get('/upcoming-interviews',{preHandler: [fastify.authenticateAdmin]},UpcomingInterviewsController)
}