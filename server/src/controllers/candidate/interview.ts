import { FastifyReply, FastifyRequest } from "fastify";
import { interviewSchedule } from "../../services/interviewer/interview";
import { v4 as uuidv4 } from "uuid";
export const interviewScheduleController=async (req:any,res:FastifyReply)=>{
    const {schedule,participants}=req.body as {schedule:Date,participants:string[]}
    const userId=req.user.payload.id;
    console.log(req.user)
    const url=`/meet/${uuidv4()}`;
    const result=await interviewSchedule(schedule,url,userId,participants);
    if(result.isFailed){
        return res.status(500).send({message:result.message,isFailed:true,data:null})
    }
    return res.status(200).send({message:result.message,isFailed:false,data:result.data})
}