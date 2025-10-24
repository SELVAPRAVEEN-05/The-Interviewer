    
import { candidateGet } from "../../services/candidate/candidate";

export const CandidateGetController=async(req: any, reply: any)=>{
    
    const data:any=await candidateGet(req.query.q)
    if(data.isFailed){
        return {message:"Error in fetching dashboard data",Failed:true,data:null}
    }
    return {message:"Dashboard data fetched successfully",Failed:false,data:data}
}