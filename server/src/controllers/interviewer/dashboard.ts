import { FastifyReply, FastifyRequest } from "fastify"
import { interviewerDashboard, interviewerHistoryInterviews, interviewerUpcomingInterviews } from "../../services/interviewer/dashboard";

export const interviewerController=async(req: any, reply: any)=>{

    const userId:any = req?.user?.payload?.id;
    const data:any=await interviewerDashboard(userId)
    if(data.isFailed){
        return {message:"Error in fetching dashboard data",Failed:true,data:null}
    }
    return {message:"Dashboard data fetched successfully",Failed:false,data:data.data}
}
export const interviewUpcomingController=async(req: any, reply: any)=>{

    const userId:any = req?.user?.payload?.id;
    const q=req.query.q
    const data:any=await interviewerUpcomingInterviews(userId,q)
    if(data.isFailed){
        return {message:"Error in fetching dashboard data",Failed:true,data:null}
    }
    return {message:"Dashboard data fetched successfully",Failed:false,data:data.data}
}

export const interviewHistoryController=async(req: any, reply: any)=>{

    const userId:any = req?.user?.payload?.id;
    const q=req.query.q
    const data:any=await interviewerHistoryInterviews(userId,q)
    if(data.isFailed){
        return {message:"Error in fetching dashboard data",Failed:true,data:null}
    }
    return {message:"Dashboard data fetched successfully",Failed:false,data:data.data}
}
