import prisma from "../lib/prisma"

// Example 1: Simple include - just get basic related data
export const profileBasic=async (id:string)=>{
    try{
        const data=await prisma.user.findFirst({
            where:{id},
            include:{
                gender: true,
                country: true,
                language: true
            }
        })
        return {isFailed:false,data:data}
    }catch(error){
        return {isFailed:true,data:null}
    }
}

// Example 2: Selective include with conditions
export const profileWithSkills=async (id:string)=>{
    try{
        const data=await prisma.user.findFirst({
            where:{id},
            include:{
                gender: true,
                country: true,
                language: true,
                userSkills: {
                    where: {
                        proficiency: "Advanced" // Only get advanced skills
                    },
                    include: {
                        skill: true
                    },
                    take: 5 // Limit to 5 skills
                }
            }
        })
        return {isFailed:false,data:data}
    }catch(error){
        return {isFailed:true,data:null}
    }
}

// Example 3: Using select with include (you can select fields from included relations)
export const profileSelectiveFields=async (id:string)=>{
    try{
        const data=await prisma.user.findFirst({
            where:{id},
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                // Include related data with selected fields
                gender: {
                    select: {
                        value: true
                    }
                },
                country: {
                    select: {
                        name: true,
                        iso_code: true
                    }
                },
                userSkills: {
                    select: {
                        proficiency: true,
                        years_of_experience: true,
                        skill: {
                            select: {
                                name: true,
                                category: true
                            }
                        }
                    }
                }
            }
        })
        return {isFailed:false,data:data}
    }catch(error){
        return {isFailed:true,data:null}
    }
}

export const profile=async (id:string)=>{
    try{
        const data=await prisma.user.findFirst(
            {
            where:{id},
            include:{
                // Include related models - this will fetch the actual related records
                gender: true,           // Gets the Gender record
                country: true,          // Gets the Country record  
                language: true,         // Gets the Language record
                educationDetails: {     // Gets all education details
                    include: {
                        educationLevel: true,  // Include education level info
                        institute: {           // Include institute info
                            include: {
                                country: true  // Include institute's country
                            }
                        }
                    }
                },
                userSkills: {           // Gets all user skills
                    include: {
                        skill: true     // Include skill details
                    }
                },
                userPositions: {        // Gets all user positions
                    include: {
                        brand: true,    // Include brand details
                        position: true  // Include position details
                    }
                }
                // You can also include other relations like:
                // interviewParticipations: true,
                // codeSubmissions: true,
                // feedbackGiven: true,
                // feedbackReceived: true,
            }
            }
            )

        return {isFailed:false,data:data}
    }catch(error){
        return {isFailed:true,data:null}
    }
}