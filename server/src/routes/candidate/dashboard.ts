import { FastifyInstance, FastifyRegister } from "fastify";
import { DashboardController } from "../../controllers/candidate/dashboard";

export const CandidateDashboardRoute=(fastify:FastifyInstance)=>{
fastify.get('/dashboard',{preHandler: [fastify.authenticateAdmin]},DashboardController)

}