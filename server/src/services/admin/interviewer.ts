import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma";

export const InterviewerData = async () => {
    // Define candidate management logic here
try {
    // Execute all queries in parallel for better performance
    const [
      totalInterviewerUsers,
      totalApprovedInterviewerUsers,
      totalPendingInterviewerUsers,
      totalRejectedInterviewerUsers,
    ] = await Promise.all([
      prisma.user.count({
        where: {
          role: 'RECRUITER',
        },
      }),
      prisma.user.count({
        where: {
          role: 'RECRUITER',
          status: 'APPROVED',
        },
      }),
     prisma.user.count({
        where: {
          role: 'RECRUITER',
          status: 'PENDING',
        },
      }),
      prisma.user.count({
        where: {
          role: 'RECRUITER',
          status: 'REJECTED',
        },
      }),
    ]);

    const result: any = {
    totalInterviewerUsers,
      totalApprovedInterviewerUsers,
      totalPendingInterviewerUsers,
      totalRejectedInterviewerUsers,
    };
    return {data:result,isFailed:false};
  } catch (error) {
    console.error('Error fetching admin dashboard statistics:', error);
    // throw new Error('Failed to fetch dashboard statistics');
    return {isFailed:true,data:null}
  }

}

export const InterviewerDataTable=async(status:String,searchQuery:String,offset:number,limit:number,role:string,department:string)=>{
    try{
        let whereData:any={

        }
        if(status!=''){
            whereData={
                status,
            }
        }
        // if(role!=''){
        //     whereData['role']=role
        // }
        // if(department!=''){
        //     whereData['department']=department
        // }
        if(searchQuery!=''){
            whereData['OR']=[
                {
                    first_name:{contains:searchQuery,mode:'insensitive'},
                   
                 },{ last_name:{contains:searchQuery,mode:'insensitive'},
                  },{  mobile_number:{contains:searchQuery,mode:'insensitive'},
                 },{ email:{contains:searchQuery,mode:'insensitive'}
                }
            ]
        }
        whereData['role']='RECRUITER'
        const data=await prisma.user.findMany({
            where:whereData,
            take:limit,
            skip:offset,  
            include:{
              // userPositions:{
              //   where:{
              //     position:{
              //       // title:"RECRUITER",
                   
              //     }

              //   }
              // },
                interviewParticipations:{
                    include:{
                        interview:{
                        }
                    }
                },
            }        
    })
    return {data:data,isFailed:false};
    }
    catch(error){
        console.error('Error fetching candidate data table:', error);
        return {isFailed:true,data:null}
    }
}