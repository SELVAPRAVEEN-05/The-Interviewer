import { FastifyReply, FastifyRequest } from "fastify";
import { educationLevelGet } from "../services/education";

export const EducationLevelGetterController = async (req: FastifyRequest, res: FastifyReply) => {
  const levels = await educationLevelGet();
  if (!levels) {
    return res.status(400).send({ message: "Error in fetching education levels", Failed: true, data: null });
  }
  return res.send(levels);
};
