import prisma from "../../lib/prisma"

export const candidateStatusUpdate=async(userId:any,status:string)=>{
    console.log("UserId in service",userId)
    // interviews that include the user (participants.some.userId = userId)
   
   
    const user=await prisma.user.update({
        where:{id:userId},
        data:{
            status:status
        }
    })
    return {
        data:user, // interviews where the user participates
        isFailed: false
    };

}
export const candidateGet=async()=>{
    const users=await prisma.user.findMany({select:{
        id:true,
        first_name:true,
        last_name:true,
        email:true,
    }})
return {users:users,isFailed:false}
    }