import { FastifyReply, FastifyRequest } from "fastify";
import { positionGet } from "../services/position";

export const PositionGetterController = async (req: FastifyRequest, res: FastifyReply) => {
  const positions = await positionGet();
  if (!positions) {
    return res.status(400).send({ message: "Error in fetching positions", Failed: true, data: null });
  }
  return res.send(positions);
};
