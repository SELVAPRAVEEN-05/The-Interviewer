import { FastifyInstance } from "fastify";
import { LoginUser, LoginUserCre } from "../controllers/auth";
export async function LoginUserRoute(fastify: FastifyInstance) {
  fastify.post("/dashboard", LoginUser);
  fastify.post("/credential", LoginUserCre);
  // fastify.post("/users", { onRequest: [fastify.authenticate] }, createUser);
}