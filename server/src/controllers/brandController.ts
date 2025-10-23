import { FastifyReply, FastifyRequest } from "fastify";
import { brandGet } from "../services/brand";

export const BrandGetterController = async (req: FastifyRequest, res: FastifyReply) => {
  const brands = await brandGet();
  if (!brands) {
    return res.status(400).send({ message: "Error in fetching brands", Failed: true, data: null });
  }
  return res.send(brands);
};
