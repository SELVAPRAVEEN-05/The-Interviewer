import { FastifyInstance } from "fastify";
import { BrandGetterController } from "../controllers/brandController";

export async function BrandRoute(fastify: FastifyInstance) {
  fastify.get("/", BrandGetterController);
}
