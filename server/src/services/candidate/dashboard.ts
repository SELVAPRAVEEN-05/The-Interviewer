import prisma from "../../lib/prisma"
const dayjs = require('dayjs');
const format=dayjs()
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
    const performaceMetrics=await prisma.feedback.findMany({
        take:10,
        orderBy:{
            created_at:'desc'
        },
        select:{
            
            created_at:true,
            score:true,
        }
    })
    // const scoreMetrics=[]
    // performaceMetrics.forEach((metrics)=>{
    //     const temp:any={}
    //     temp.date=format.format(metrics.created_at, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    //     temp.score=metrics.score
    //     scoreMetrics.push(temp)
    // })
    
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

   
// Aggregate feedbackSkill values by skillId
      const rawScore = await prisma.feedbackSkill.groupBy({
        by: ['skillId'],
        where: {
          feedback: {
            given_to_user_id: userId,
          },
        },
        take: 5,
        orderBy: {
          _sum: {
            value: 'desc',
          },
        },
        _sum: {
          value: true,
        },
      });

      // Fetch skill names for the grouped skillIds and merge them into the result.
      const skillIds = rawScore.map((r: any) => r.skillId).filter(Boolean);
      let score: any[] = [];
      if (skillIds.length > 0) {
        const skills = await prisma.skill.findMany({
          where: { id: { in: skillIds } },
          select: { id: true, name: true },
        });

        score = rawScore.map((r: any) => {
          const skill = skills.find((s: any) => s.id === r.skillId);
          return {
            skillName: skill ? skill.name : null,
            // keep aggregated sums and other groupBy fields if needed
            _sum: r._sum,
          };
        });
      }
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

  

    const feedbackStats = {
        // totalFeedbacks,
        sumScore,
        averageScore: avgScore,
        // sumRating,
        // averageRating: avgRating,
    }

    return {
        interviewsCount, // interviews where the user participates
        interviewsSortListedCount,
        // maintain previous raw data for compatibility
        // score: interviewsWithFeedback,
        feedbackStats,
        shortlistedCount,
        score,
        performaceMetrics,
        // perInterview,
        isFailed: false
    };

}