import { FastifyInstance, FastifyRegister } from "fastify";
import { DashboardController } from "../../controllers/admin/dashboardController";
import { upcomingInterviewsController } from "../../controllers/admin/interview";

export const AdminDashboardRoute=(fastify:FastifyInstance)=>{
fastify.get('/dashboard',DashboardController)
fastify.get('/upcoming-interviews',upcomingInterviewsController)

}