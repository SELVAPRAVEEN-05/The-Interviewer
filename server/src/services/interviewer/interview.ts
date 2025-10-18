import prisma from "../../lib/prisma"

export const interviewSchedule=async (schedule:Date,url:string,userId:string,participants:string[],type:string,name:string)=>{
    console.log(schedule,url,userId,participants)
    try{
       const data= await prisma.interview.create({
        data:{
            scheduled_at:schedule,
            session_link:url,
            interviewerId:userId,
            type:type,
            name:name,
            status:"SCHEDULED",
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
    await prisma.interview.update({
        where:{id:interviewId},
        data:{status:"COMPLETED"}
    })

    return {message:"Interview Feedback Submitted Successfully",isFailed:false,data:data}
}catch(err){
    console.log(err)
    return {message:"Failed to submit interview feedback",isFailed:true}
}
}

export const interviewUpdate=async (interviewId:string,userId:string,updateData:any)=>{
    console.log(interviewId,userId,updateData)
    try{
        // Verify the interviewer owns this interview
        const interview = await prisma.interview.findFirst({
            where:{
                id:interviewId,
                interviewerId:userId
            }
        })
        
        if(!interview){
            return {message:"Interview not found or you don't have permission to update it",isFailed:true}
        }

        // Prepare update data object
        const dataToUpdate:any = {}
        
        if(updateData.scheduled_at){
            dataToUpdate.scheduled_at = new Date(updateData.scheduled_at)
        }
        if(updateData.status){
            dataToUpdate.status = updateData.status
        }
        if(updateData.session_link){
            dataToUpdate.session_link = updateData.session_link
        }
        if(updateData.prize !== undefined){
            dataToUpdate.prize = updateData.prize
        }

        const data = await prisma.interview.update({
            where:{id:interviewId},
            data:dataToUpdate,
            include:{
                participants:true,
                user:true
            }
        })

        return {message:"Interview Updated Successfully",isFailed:false,data:data}
    }catch(err){
        console.log(err)
        return {message:"Failed to update interview",isFailed:true}
    }
}