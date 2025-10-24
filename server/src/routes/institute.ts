import { FastifyInstance } from "fastify";
import { InstituteGetterController } from "../controllers/instituteController";

export async function InstituteRoute(fastify: FastifyInstance) {
  // existing admin-only POST route (keeps previous behavior)
  fastify.post("/institute", { preHandler: fastify.authenticateAdmin }, InstituteGetterController);

  // public GET to fetch institutes (used by onboarding and profile forms)
  fastify.get("/", InstituteGetterController);
}