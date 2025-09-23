import { FastifyReply, FastifyRequest } from "fastify";
import { instituteGet } from "../services/institute";

export const InstituteGetterController=async (req:FastifyRequest,res:FastifyReply)=>{
    const institutes = await instituteGet();
    if(!institutes){
        return res.status(400).send({message:"Error in fetching institutes",Failed:true,data:null})
    }
    return res.send(institutes);
}