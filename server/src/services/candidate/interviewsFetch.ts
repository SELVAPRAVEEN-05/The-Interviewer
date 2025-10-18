import prisma from "../../lib/prisma"

export const candidateInterviewHistory=async(userId:any)=>{
    console.log("UserId in service",userId)
    const interviews = await prisma.interview.findMany({
        where: {
            participants: {
                some: { userId: userId }
            }
        },
        include:{
            feedbacks:{

            },
            user:{
                include:{
                    userPositions:true
                }
            }

        }
    })
    return {
        interviews, // interviews where the user participates
        isFailed: false
    };

}
export const candidateUpcomingInterviews=async(userId:any,q:string)=>{
    const upcomingInterviews=await prisma.interview.findMany({
        where:{
            scheduled_at:{
                gte:new Date()
            },
            participants:{
                some:{userId:userId}
            },
           OR: [
  { name: { contains: q, mode: 'insensitive' } },
  { type: { contains: q, mode: 'insensitive' } },
  {
    participants: {
          some: {
        user: {
          first_name: { contains: q, mode: 'insensitive' },
          
          
        }
      }
    }
  },
  {
    participants: {
      some: {
        user: {
          last_name: { contains: q, mode: 'insensitive' }
        }
      }
    }
  }
]

        },
        select:{
            scheduled_at:true,
            status:true,
            session_link:true,
            interviewerId:true,
            type:true,
            name:true,
            
            user:{
                
                select:{
                    
                    
                    userPositions:{
                        take:1,
                        select:{
                            // position:{
                            //     select:{
                            //         title:true,
                            //     }
                            // },
                            brand:{
                                select:{
                                    name:true,
                                    website_url:true,
                                    industry:true
                                }
                            }
                        }
                    }
                }
            },
            participants:{
                select:{
                    user:{
                        select:{
                            first_name:true,
                            last_name:true,
                            email:true,
                        }
                    }
                }
            }
        },
        
    })
    return {isFailed:false,data:upcomingInterviews}
}
