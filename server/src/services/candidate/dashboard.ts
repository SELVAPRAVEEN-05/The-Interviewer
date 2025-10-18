import prisma from "../../lib/prisma"

export const candidateDashboard=async(userId:any)=>{
    console.log("UserId in service",userId)
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
                some: { userId: userId 
                , sortlisted: true  
                }
            }
        },
    })
const shortlistedCount=await prisma.interview.count(
        {
            where:{participants:{
                some:{
                    userId:userId,
                    sortlisted:true
                }
            }}
        }
    )

    // keep existing interviews with feedback for compatibility
    const interviewsWithFeedback = await prisma.interview.findMany({
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

    // fetch all feedbacks given to the user and compute aggregates
    const feedbacks = await prisma.feedback.findMany({
        where: { given_to_user_id: userId }
    })

    const totalFeedbacks = feedbacks.length
    const sumScore = feedbacks.reduce((s, f) => s + (f.score ?? 0), 0)
    const avgScore = totalFeedbacks ? sumScore / totalFeedbacks : 0
    const sumRating = feedbacks.reduce((s, f) => s + (f.rating ?? 0), 0)
    const avgRating = totalFeedbacks ? sumRating / totalFeedbacks : 0

    // per-interview summary
    const perInterviewMap = new Map<string, { interviewId: string; feedbackCount: number; sumScore: number; sumRating: number }>()
    feedbacks.forEach(f => {
        const id = f.interviewId
        const entry = perInterviewMap.get(id) ?? { interviewId: id, feedbackCount: 0, sumScore: 0, sumRating: 0 }
        entry.feedbackCount += 1
        entry.sumScore += (f.score ?? 0)
        entry.sumRating += (f.rating ?? 0)
        perInterviewMap.set(id, entry)
    })

    const perInterview = Array.from(perInterviewMap.values()).map(e => ({
        interviewId: e.interviewId,
        feedbackCount: e.feedbackCount,
        averageScore: e.feedbackCount ? e.sumScore / e.feedbackCount : 0,
        averageRating: e.feedbackCount ? e.sumRating / e.feedbackCount : 0
    }))

    const feedbackStats = {
        totalFeedbacks,
        sumScore,
        averageScore: avgScore,
        sumRating,
        averageRating: avgRating,
    }

    return {
        interviewsCount, // interviews where the user participates
        interviewsSortListedCount,
        // maintain previous raw data for compatibility
        // score: interviewsWithFeedback,
        feedbackStats,
        shortlistedCount,
        // perInterview,
        isFailed: false
    };

}