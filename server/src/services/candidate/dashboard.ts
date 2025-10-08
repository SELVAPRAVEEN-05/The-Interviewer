import prisma from "../../lib/prisma"

export const candidateDashboard=async(userId:any)=>{

    const data=await prisma.interview.findMany({
        include:{
            participants:{
                where:{
                    userId,
                    role:'CANDIDATE'
                }
            }
        }
    })
    console.log(data)
   
    
}