import prisma from "../../lib/prisma"

export const candidateDashboard=async(userId:any)=>{
console.log("UserId in service",userId)
const interview = await prisma.interviewParticipant.findMany({
    where:{
        userId:userId
    },
})
    // interviews that include the user (participants.some.userId = userId)
    const interviewsCount = await prisma.interview.count({
        where: {
            participants: {
                some: { userId: userId }
            }
        },
    })
     const interviewsSortListedCount = await prisma.interview.count({
        where: {
            participants: {
                some: { userId: userId, 
                    // sortlisted: true
                 }
            }
        },
    })
    const score = await prisma.interview.findMany({
        where:{
            participants:{
                some:{userId:userId}
            },
            feedbacks:{
                some:{
                    given_to_user_id:userId
                }
            },
        },
        include:{
            feedbacks:{
                where:{
                    given_to_user_id:userId
                }
            },
            
        }
    })


    return {
       interviewsCount, // interviews where the user participates
     interviewsSortListedCount,

     score,
        isFailed: false
    };
    
}