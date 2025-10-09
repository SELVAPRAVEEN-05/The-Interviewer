import { FastifyInstance, FastifyRegister } from "fastify";
import { DashboardController } from "../../controllers/admin/dashboardController";
import { upcomingInterviewsController } from "../../controllers/admin/interview";
import { CandidateData, CandidateDataTable } from "../../controllers/admin/candidateController";
import { InterviewerDataController, InterviewerDataTableController } from "../../controllers/admin/interviewer";

export const AdminDashboardRoute=(fastify:FastifyInstance)=>{
fastify.get('/dashboard',DashboardController)
fastify.get('/upcoming-interviews',upcomingInterviewsController)
fastify.get('/candidates',CandidateData)
fastify.get('/candidates-table',CandidateDataTable)
fastify.get('/interviewers',InterviewerDataController)
fastify.get('/interviewers-table',InterviewerDataTableController)

}