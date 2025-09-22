import { FastifyRequest } from "fastify";
import { GetSkills } from "../services/skillService";

export const skillController=async (req:FastifyRequest,res:any)=>{
return GetSkills();
}