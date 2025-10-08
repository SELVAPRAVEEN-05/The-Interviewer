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
export const interviewerUpcomingInterviews=async(userId:any)=>{
    const upcomingInterviews=await prisma.interview.findMany({
        where:{
            interviewerId:userId,
            scheduled_at:{
                gte:new Date()
            }
        },
        include:{
            participants:true,
            user:true
        }
    })
    return {isFailed:false,data:upcomingInterviews}
}