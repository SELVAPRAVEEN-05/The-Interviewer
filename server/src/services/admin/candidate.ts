import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../lib/prisma";

export const candidateData = async () => {
    // Define candidate management logic here
try {
    // Execute all queries in parallel for better performance
    const [
      totalCandidateUsers,
      totalApprovedCandidates,
      totalPendingCandidates,
      totalRejectedInterviews,
    ] = await Promise.all([
      prisma.user.count({
        where: {
          role: 'CANDIDATE',
        },
      }),
      prisma.user.count({
        where: {
          role: 'CANDIDATE',
          status: 'APPROVED',
        },
      }),
     prisma.user.count({
        where: {
          role: 'CANDIDATE',
          status: 'PENDING',
        },
      }),
      prisma.user.count({
        where: {
          role: 'CANDIDATE',
          status: 'REJECTED',
        },
      }),
    ]);

    const result: any = {
     totalCandidateUsers,
      totalApprovedCandidates,
      totalPendingCandidates,
      totalRejectedInterviews,
    };
    return {data:result,isFailed:false};
  } catch (error) {
    console.error('Error fetching admin dashboard statistics:', error);
    // throw new Error('Failed to fetch dashboard statistics');
    return {isFailed:true,data:null}
  }

}

export const CandidateDataTable=async(status:String,searchQuery:String,offset:number,limit:number)=>{
    try{
        let whereData:any={

        }
        if(status!=''){
            whereData={
                status,
            }
        }
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
        whereData['role']='CANDIDATE'
        const data:any=await prisma.user.findMany({
            where:whereData,
            take:limit,
            skip:offset,  
            include:{
                interviewParticipations:{
                    include:{
                        user:true,
                        interview:{
                        }
                    }
                },
                userSkills:{
                    include:{
                        skill:true
                    }
                }
            }        
    })
    console.log(data)
    return {data:data,isFailed:false};
    }
    catch(error){
        console.error('Error fetching candidate data table:', error);
        return {isFailed:true,data:null}
    }
}