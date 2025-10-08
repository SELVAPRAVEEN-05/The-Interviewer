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
export const candidateUpcomingInterviews=async(userId:any)=>{
    console.log("UserId in service",userId)
    const interviews = await prisma.interview.findMany({
        where: {
            scheduled_at:{
                gte:new Date()
            },
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