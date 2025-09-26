import { FastifyInstance } from "fastify";
import { instituteController } from "../controllers/instituteController";
export async function InstituteRoute(fastify: FastifyInstance) {
  fastify.post("/institute",{preHandler:fastify.authenticate},instituteController );
}