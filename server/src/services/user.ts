import prisma from "../lib/prisma"

export const updateProfile=async (id:string,first_name:string,email:string,mobile_number:string)=>{
    try {
        const existingUser=await prisma.user.findFirst({
               where:{id},
        })
    console.log("updating user", { id, first_name, mobile_number, email })
        if(!existingUser){
            return {isFailed:true,data:null}
        }
        // Only update the scalar fields we intend to change. Spreading the entire
        // `existingUser` object into `data` can include nested relations or read-only
        // fields which Prisma rejects (causing the validation error). Keep the update
        // payload minimal and explicit.
        const data = await prisma.user.update({
            where: { id: existingUser.id },
            data: {
                id: existingUser.id,
                first_name,
                mobile_number,
              
            },
        })
        return {isFailed:false,data:data}
    }catch(error){
        console.error('Error updating profile:', error);
        return {isFailed:true,data:null}
    }
}
export const profile=async (id:string)=>{
    try{
        const data=await prisma.user.findFirst(
            {
            where:{id},
            select:{
               id:true,
                first_name:true,
                last_name:true,
                email:true,
                profile_url:true,
                mobile_number:true, 
                role:true,
                created_at:true,
                userPositions:{
                    select:{
                        position:{
select:{
    department:true,
    title:true
}
                        },
                        brand:{
                            select:{
                                name:true
                            }
                        }
                    }
                }
            }
        }
            )

        return {isFailed:false,data:data}
    }catch(error){
        return {isFailed:true,data:null}
    }
}