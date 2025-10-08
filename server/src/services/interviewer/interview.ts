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
    console.log(err)
    return {message:"Failed to schedule interview",isFailed:true}
}
}
export const interviewFeedBack=async (interviewId:string,given_to_user_id:string,given_by_user_id:string,rating:number,comments:string,score:number)=>{
    console.log(interviewId,given_to_user_id,given_by_user_id,rating,comments,score)
    try{
       const data= await prisma.feedback.create({
        data:{
            interviewId:interviewId,
            given_to_user_id:given_to_user_id,
            given_by_user_id:given_by_user_id,
            rating:rating,
            comments:comments,
            score:score
           
        }
    })
   
    return {message:"Interview Feedback Submitted Successfully",isFailed:false,data:data}
}catch(err){
    console.log(err)
    return {message:"Failed to submit interview feedback",isFailed:true}
}
}