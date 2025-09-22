import { FastifyInstance } from "fastify";
import { CreateUser, ValidateUser } from "../controllers/authController";
import { skillController } from "../controllers/skillController";
export async function Skill(fastify: FastifyInstance) {
  fastify.get("/all",skillController );
}