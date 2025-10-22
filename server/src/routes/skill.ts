import { FastifyInstance } from "fastify";
import { CreateUser, ValidateUser } from "../controllers/authController";
import { skillController } from "../controllers/skillController";
import { feedbackSkillController } from "../controllers/skillController";
import { skillsForInterviewController } from "../controllers/skillController";
export async function Skill(fastify: FastifyInstance) {
  fastify.get("/all",skillController );

  // GET skills configured for a specific interview
  fastify.get('/interview/:id', skillsForInterviewController)
}