import prisma from "../../lib/prisma"
export const candidateInterviewHistory=async(userId:any,q:string, page:number=1, limit:number=10)=>{
    const take = Math.max(1, Math.min(100, limit));
    const skip = (Math.max(1, page) - 1) * take;
    const upcomingInterviews=await prisma.interview.findMany({
        where:{
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
             id:true,
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
            id:true,
            scheduled_at:true,
            status:true,
            session_link:true,
            interviewerId:true,
            type:true,
            name:true,
            user:{
                select:{
                    id:true,
                    email:true,
                    first_name:true,
                    last_name:true, 
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
            },
            feedbacks:{
                select:{
                    score:true,
                    rating:true,
                    positive_aspects:true,
                    negative_aspects:true,

                }
            }
        },
        
    })
    return {isFailed:false,data:upcomingInterviews}
}
