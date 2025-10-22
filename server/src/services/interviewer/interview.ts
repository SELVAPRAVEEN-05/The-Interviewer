import { transporter } from "../../lib/mailer"
import prisma from "../../lib/prisma"

export const interviewSchedule=async (schedule:Date,url:string,userId:string,participants:string[],type:string,name:string,duration:number,skillId:number[])=>{
    console.log(schedule,url,userId,participants)
    const candidate=await prisma.user.findFirst({where:{
        id:participants[0]
    }})
    
    // Try to fetch interviewer's company/brand (if available)
    const interviewer = await prisma.user.findUnique({
        where: { id: userId },
        include: { userPositions: { include: { brand: true } } }
    })


    const companyName = interviewer?.userPositions?.[0]?.brand?.name || "Your Company";
    const interviewName = name || "Interview Session";
    const candidateEmail = candidate?.email || "navaneetha2006krishnan@gmail.com";

    const mailOptions = {
        from: 'no-reply@codemeet.com',
        to: candidateEmail,
        subject: `${companyName} - ${interviewName} Invitation`,
        text: `Hello ${candidate?.first_name || ''},\n\nYou have been invited to the ${interviewName} at ${companyName}.\n\nScheduled time: ${new Date(schedule).toLocaleString()}.\nDuration: ${duration || 30} minutes.\n\nJoin the session here: ${url}\n\nIf you have any questions, reply to this email.\n\nBest regards,\n${companyName} Recruitment Team`,
        html: `<p>Hello ${candidate?.first_name || ''},</p><p>You have been invited to the <strong>${interviewName}</strong> at <strong>${companyName}</strong>.</p><p><strong>Scheduled time:</strong> ${new Date(schedule).toLocaleString()}<br/><strong>Duration:</strong> ${duration || 30} minutes</p><p><a href="${url}">Join the session</a></p><p>If you have any questions, reply to this email.</p><p>Best regards,<br/>${companyName} Recruitment Team</p>`
    };
     transporter.sendMail(mailOptions, (error:any, info:any) => {
        if (error) {
            console.error("Error occurred:", error);
            // res.status(500).send('Error in sending email. Please try again later.');
        } else {
            console.log('Email sent:', info.response);
            // res.send('Email sent successfully!');
        }
    });
    try{
       const data= await prisma.interview.create({
        data:{
            scheduled_at:schedule,
            session_link:url,
            interviewerId:userId,
            type:type,
            name:name,
            duration:duration?duration:30,
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
    await prisma.interviewSkill.createMany({
    data:skillId.map(id=>({
        interviewId:data?.id || "",
        skillId:id,
        value:0,
        maxValue:100
    }))
}) 
    return {message:"Interview Scheduled Successfully",isFailed:false,data:data}
}catch(err){
    console.log(err)
    return {message:"Failed to schedule interview",isFailed:true}
}
}
export const interviewFeedBack=async (
    interviewId:string,
    given_to_user_id:string,
    given_by_user_id:string,
    rating:number,
    comments:string,
    score:number,
    feedbackSkills?: { skillId: number; value: number }[]
)=>{
    console.log(interviewId,given_to_user_id,given_by_user_id,rating,comments,score,feedbackSkills)
    try{
       const data= await prisma.feedback.create({
        data:{
            interviewId:interviewId,
            given_to_user_id:given_to_user_id,
            given_by_user_id:given_by_user_id,
            rating:rating,
            comments:comments,
            score:score,
            // create per-feedback skill ratings when provided
            feedbackSkills: feedbackSkills && feedbackSkills.length ? {
                create: feedbackSkills.map(fs => ({ skillId: fs.skillId, value: fs.value }))
            } : undefined
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
export const shortlisted=async (interviewId:string,userId:string)=>{
    
    try{
        // Verify the interviewer owns this interview
        const interview = await prisma.interview.findFirst({
            where:{
                id:interviewId
            }
        })
        
        if(!interview){
            return {message:"Interview not found or you don't have permission to update it",isFailed:true}
        }

      

        const data=await prisma.interviewParticipant.updateMany({
            where:{
                interviewId:interviewId
            },
            data:{
                sortlisted:true
            }
        })
        return {message:"Interview Updated Successfully",isFailed:false,data:interview}
    }catch(err){
        console.log(err)
        return {message:"Failed to update interview",isFailed:true}
    }
}