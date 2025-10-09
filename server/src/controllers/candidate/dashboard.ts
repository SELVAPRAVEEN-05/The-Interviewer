import { FastifyReply, FastifyRequest } from "fastify"
import { AdminDashboardService } from "../../services/admin/dashboard"
import { candidateDashboard } from "../../services/candidate/dashboard"

export const DashboardController=async(req: any, reply: any)=>{

    const userId:any = req?.user?.payload?.id;
    const data:any=await candidateDashboard(userId)
    if(data.isFailed){
        return {message:"Error in fetching dashboard data",Failed:true,data:null}
    }
    return {message:"Dashboard data fetched successfully",Failed:false,data:data}
}