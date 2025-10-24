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
    const q = typeof req.query?.q === 'string' ? req.query.q : '';
    // parse pagination params
    const pageRaw = req.query?.page ?? req.query?.p;
    const limitRaw = req.query?.limit ?? req.query?.per_page ?? req.query?.perPage;
    const page = Number.isFinite(Number(pageRaw)) ? Math.max(1, parseInt(pageRaw, 10)) : 1;
    const limit = Number.isFinite(Number(limitRaw)) ? Math.max(1, parseInt(limitRaw, 10)) : 10;

    const data:any=await interviewerHistoryInterviews(userId,q,page,limit)
    if(data.isFailed){
        return {message:"Error in fetching dashboard data",Failed:true,data:null}
    }
    return {message:"Dashboard data fetched successfully",Failed:false,data:data.data,meta: data.meta}
}
