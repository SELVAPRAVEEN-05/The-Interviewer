import { profile } from "../services/user";

export const profileController=async(request:any,reply:any)=>{
    const id=request.user.id;
    const profileData=await profile(id);
    if(profileData.isFailed){
        return reply.status(500).send({message:"Something went wrong",isFailed:true,data:null})
    }
    return reply.status(200).send({message:"Profile fetched successfully",isFailed:false,data:profileData.data})
}