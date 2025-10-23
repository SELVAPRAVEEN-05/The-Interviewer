import { FastifyInstance } from "fastify";
import { EducationLevelGetterController } from "../controllers/educationController";

export async function EducationRoute(fastify: FastifyInstance) {
  fastify.get("/", EducationLevelGetterController);
}
