import prisma from "../../lib/prisma"

export const interviewSchedule=async (schedule:Date,url:string,userId:string,participants:string[])=>{
    console.log(schedule,url,userId,participants)
    try{
       const data= await prisma.interview.create({
        data:{
            scheduled_at:schedule,
            session_link:url,
            interviewerId:userId
        }
    })
    participants.map(async(participantId:string)=>{
        await prisma.interviewParticipant.create({
            data:{
                interviewId:data.id,
                userId:participantId,
                role:"CANDIDATE",
            }
        })
    })
    return {message:"Interview Scheduled Successfully",isFailed:false,data:data}
}catch(err){
    return {message:"Failed to schedule interview",isFailed:true}
}
}