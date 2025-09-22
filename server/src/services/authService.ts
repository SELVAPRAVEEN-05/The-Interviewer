import fastify from "../middleware/jwt";
import prisma from "../lib/prisma";
export async function ValidateUserService(data:any) {
      if (!data) {
            console.log("No data provided");
            return { message: "Email is required", data: null };
        }
    try{
        console.log(data)
          
        const user =await prisma.user.findFirst({where: {email:data.email,password:data.password}})
          console.log(user)
        
          const accessToken = fastify.jwt.sign({ payload:{id:user?.id,name:user?.first_name,email:user?.email} });
          if(user==null){
            return {message:"Login failed",data:null}
          }
          
         return {message:"Login successful",data:{user:user,token:accessToken}}
    }
    catch(err){
        return {message:"Login successful",data:null}
    }
   
}

export async function CreateUserService(data:any) {
      if (!data) {
            console.log("No data provided");
            return { message: "Email is required", data: null };
        }
    try{
        console.log(data)
          
        const user =await prisma.user.findFirst({where: {email:data.email,password:data.password}})
          console.log(user)

          const accessToken = fastify.jwt.sign({ payload:{id:user?.id,name:user?.first_name,email:user?.email} });
          if(user==null){
            return {message:"Login failed",data:null}
          }
          
         return {message:"Login successful",data:{user:user,token:accessToken}}
    }
    catch(err){
        return {message:"Login successful",data:null}
    }
   
}