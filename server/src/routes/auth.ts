import { FastifyInstance } from "fastify";
import { CreateUser, ValidateUser } from "../controllers/authController";
export async function LoginUserRoute(fastify: FastifyInstance) {
  fastify.post("/create",CreateUser );
  fastify.post("/validate",ValidateUser );
  // fastify.post("/users", { onRequest: [fastify.authenticate] }, createUser);
}