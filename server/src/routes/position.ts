import { FastifyInstance } from "fastify";
import { PositionGetterController } from "../controllers/positionController";

export async function PositionRoute(fastify: FastifyInstance) {
  fastify.get("/", PositionGetterController);
}
