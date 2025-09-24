import { AdminDashboardService } from "../../services/admin/dashboard"

export const DashboardController=async()=>{
    
    const data:any=await AdminDashboardService()
    if(data.isFailed){
        return {message:"Error in fetching dashboard data",Failed:true,data:null}
    }
    return {message:"Dashboard data fetched successfully",Failed:false,data:data}
}