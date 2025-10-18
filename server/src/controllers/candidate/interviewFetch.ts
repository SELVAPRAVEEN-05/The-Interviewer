
import { candidateInterviewHistory, candidateUpcomingInterviews } from "../../services/candidate/interviewsFetch";

export const candidateInterviewHistoryController=async(req: any, reply: any)=>{
    const userId:any = req?.user?.payload?.id;
    const data:any=await candidateInterviewHistory(userId)
    if(data.isFailed){
        return {message:"Error in fetching interview history data",Failed:true,data:null}
    }
    return {message:"Interview history data fetched successfully",Failed:false,data:data}
}
// export const UpcomingInterviewsController=async(req: any, reply: any)=>{
//     const userId:any = req?.user?.payload?.id;
//     const data:any=await candidateUpcomingInterviews(userId)
//     if(data.isFailed){
//         return {message:"Error in fetching upcoming interviews data",Failed:true,data:null}
//     }
//     return {message:"Upcoming interviews data fetched successfully",Failed:false,data:data}
// }
export const UpcomingInterviewsController=async(req: any, reply: any)=>{

    const userId:any = req?.user?.payload?.id;
    const q=req.query.q
    const data:any=await candidateUpcomingInterviews(userId,q)
    if(data.isFailed){
        return {message:"Error in fetching dashboard data",Failed:true,data:null}
    }
    return {message:"Dashboard data fetched successfully",Failed:false,data:data.data}
}