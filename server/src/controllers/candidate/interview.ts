import { FastifyReply, FastifyRequest } from "fastify";
import { interviewFeedBack, interviewSchedule } from "../../services/interviewer/interview";
import { v4 as uuidv4 } from "uuid";
import { candidateGet } from "../../services/candidate/candidate";
export const interviewScheduleController=async (req:any,res:FastifyReply)=>{
    const {schedule,participants,type,name,duration,skill}=req.body as {schedule:Date,participants:string[],type:string,name:string,duration:number,skill:number[]}
    const userId=req.user.payload.id;
    const url=`/rooms/${uuidv4()}`;
    const result=await interviewSchedule(schedule,url,userId,participants,type,name,duration,skill);
    if(result.isFailed){
        return res.status(500).send({message:result.message,isFailed:true,data:null})
    }
    return res.status(200).send({message:result.message,isFailed:false,data:result.data})
}
export const interviewFeedbackController=async (req:any,res:FastifyReply)=>{
    const {interviewId,feedback,given_to_user_id,rating,comments,score}=req.body as {interviewId:string,feedback:string,given_to_user_id:string,rating:number,comments:string,score:number}
    const given_by_user_id=req.user.payload.id;
    console.log(given_by_user_id)
    const result=await interviewFeedBack(interviewId,given_to_user_id,given_by_user_id,rating,comments,score);
    if(result.isFailed){
        return res.status(500).send({message:result.message,isFailed:true,data:null})
    }
    return res.status(200).send({message:result.message,isFailed:false,data:result.data})
}
