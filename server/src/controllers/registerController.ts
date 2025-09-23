import { FastifyReply, FastifyRequest } from "fastify";
import { CandidateRegistrationService } from "../services/registerService";

export const CandidateRegistrationController=async (req: FastifyRequest, res: FastifyReply)=>{
    const data=req.body
    const temp=await CandidateRegistrationService(data)
    if(temp.Failed){
    return res.status(400).send(temp)
}
    return res.status(200).send(temp)
}