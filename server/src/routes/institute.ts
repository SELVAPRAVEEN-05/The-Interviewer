import { FastifyInstance } from "fastify";
import {  InstituteGetterController } from "../controllers/instituteController";
export async function InstituteRoute(fastify: FastifyInstance) {
  fastify.post("/institute",{preHandler:fastify.authenticateAdmin},InstituteGetterController );
}