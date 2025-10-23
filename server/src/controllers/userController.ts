import { profile, updateProfile } from "../services/user";

export const profileController=async(request:any,reply:any)=>{
    const id=request.user?.payload?.id;
    const profileData=await profile(id);
    if(profileData.isFailed){
        return reply.status(500).send({message:"Something went wrong",isFailed:true,data:null})
    }
    return reply.status(200).send({message:"Profile fetched successfully",isFailed:false,data:profileData.data})
}

export const profileUpdateController=async(request:any,reply:any)=>{
    const id=request.user?.payload?.id;
    console.log(request.user)
    const {first_name,email,mobile_number}=request.body;
    const profileData=await updateProfile(id,first_name,email,mobile_number);
    if(profileData.isFailed){
        return reply.status(500).send({message:"Something went wrong",isFailed:true,data:null})
    }
    return reply.status(200).send({message:"Profile updated successfully",isFailed:false,data:profileData.data})
}