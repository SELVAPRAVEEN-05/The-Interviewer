import prisma from "../../lib/prisma"

export const interviewerDashboard=async(userId:any)=>{

    // interviews that include the user (participants.some.userId = userId)
    const interviewCount:any=await prisma.interview.count({
        where:{interviewerId:userId},
    })
    const scheduledInterviewsCount=await prisma.interview.count({
        where:{
            interviewerId:userId,
            status:"SCHEDULED"
        }
    })
    const shortlistedCount=await prisma.interview.count(
        {
            where:{interviewerId:userId,
            participants:{
                some:{sortlisted:true}
            }
        }
        })
    const [scheduled, completed, cancelled]=await Promise.all([
             prisma.interview.count({
        where:{
            interviewerId:userId,
            status:"SCHEDULED"
        }
    }), prisma.interview.count({
        where:{
            interviewerId:userId,
            status:"COMPLETED"
        }
    }), prisma.interview.count({
        where:{
            interviewerId:userId,
            status:"CANCELLED"
        }
    })
        
    ])
    return {
        data:{
        data:{
                interviewCount,
                scheduled:scheduledInterviewsCount,
                shortlisted:shortlistedCount,
                avgDuration:30, // placeholder for now,
interviewData:{
    scheduled,
    completed,
    cancelled
}
            }
        }, // interviews where the user participates
        isFailed: false
    };

}
export const interviewerUpcomingInterviews=async(userId:any,q:string)=>{
    const upcomingInterviews=await prisma.interview.findMany({
        where:{
            interviewerId:userId,

            scheduled_at:{
                gte:new Date()
            },
           OR: [
  { name: { contains: q, mode: 'insensitive' } },
  { type: { contains: q, mode: 'insensitive' } },
  {
    participants: {
      some: {
        user: {
          first_name: { contains: q, mode: 'insensitive' }
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
export const interviewerHistoryInterviews=async(userId:any,q:string, page:number=1, limit:number=10)=>{
    const take = Math.max(1, Math.min(100, limit));
    const skip = (Math.max(1, page) - 1) * take;
    const upcomingInterviews=await prisma.interview.findMany({
        where:{
            interviewerId:userId,

            
           OR: [
  { name: { contains: q, mode: 'insensitive' } },
  { type: { contains: q, mode: 'insensitive' } },
  {
    participants: {
      some: {
        user: {
          first_name: { contains: q, mode: 'insensitive' }
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
        skip,
        take,
        select:{
            scheduled_at:true,
            status:true,
            session_link:true,
            interviewerId:true,
            type:true,
            name:true,
            feedbacks:true,
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
                    sortlisted:true,
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
    // also provide pagination meta
    const total = await prisma.interview.count({
        where:{
            interviewerId:userId,
            OR: [
                { name: { contains: q, mode: 'insensitive' } },
                { type: { contains: q, mode: 'insensitive' } },
                {
                    participants: {
                        some: { user: { first_name: { contains: q, mode: 'insensitive' } } }
                    }
                },
                {
                    participants: {
                        some: { user: { last_name: { contains: q, mode: 'insensitive' } } }
                    }
                }
            ]
        }
    })
    return {isFailed:false,data:upcomingInterviews,meta:{page,limit:take,total,pages: Math.ceil(total / take)}}
}