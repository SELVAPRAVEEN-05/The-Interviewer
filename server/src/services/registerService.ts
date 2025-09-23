import { count } from "console"
import prisma from "../lib/prisma"

export const CandidateRegistrationService=async (data:any)=>{
    try{    
    const createdUser=await prisma.user.create({data:{
        first_name:data.first_name,
        last_name:data.last_name,
        email:data.email,
        password:data.password,
        mobile_number:data.phone,
        role:"CANDIDATE",
        date_of_birth:data.dob,
        genderId:data.genderId,
        countryId:data.countryId,
        languageId:data.languageId,
        github_url:data.github_url,
        linkedin_url:data.linkedin_url,
        portfolio_url:data.portfolio_url,
        resume_url:data.resume_url,
        profile_picture_url:data.profile_picture_url,
    }})
   for(const skill of data.skills){
    await prisma.userSkill.create({data:{
        userId:createdUser.id,
        skillId:skill.id
    }})
   }
   const Education=await prisma.educationDetail.create({data:{
    userId:createdUser.id,
    instituteId:data.education.instituteId,
    educationLevelId:data.education.educationLevelId,
    specialization:data.education.specialization,
    year_of_passing:data.education.year_of_passing,
   }})
   const EducationTen=await prisma.educationDetail.create({data:{
        educationLevelId:1,
        userId:createdUser.id,
        marks_obtained:data.sslc.marks_obtained,
        max_marks:100
   }})
    const Educationtwelth=await prisma.educationDetail.create({data:{
        educationLevelId:2,
        userId:createdUser.id,
        marks_obtained:data.hsl.marks_obtained,
        max_marks:100
   }})
   return {message:"Registration Successful",Failed:false,data:createdUser}
} catch(err){
    console.log(err)
    return {message:"Error in Registration",Failed:true,data:null}
}
}
// export const InterviewerRegistrationService=async (data:any)=>{
    
//     try{
//     const createdUser=await prisma.user.create({data:{
//         first_name:data.first_name,
//         last_name:data.last_name,
//         email:data.email,
//         gender:data.genderId,
//         password:data.password,

//     }})
//     } catch(err){
//     console.log(err)
//     return {message:"Error in Registration",Failed:true,data:null}
//     }
// }