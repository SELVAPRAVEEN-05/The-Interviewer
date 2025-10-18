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
            where:{
              role:'CANDIDATE',
              ...whereData
            },
            take:limit,
            skip:offset,  
            select:{
              id:true,
              role:true,
              mobile_number:true,
              gender:{
                select:{
                    value:true
                }
              },
              date_of_birth:true,
              first_name:true,
              last_name:true,
              email:true,
              status:true,
              created_at:true,
              resume_url:true,
              github_url:true,
              linkedin_url:true,
              portfolio_url:true,
              educationDetails:{
              


                select:{
                  specialization:true,
                  year_of_passing:true,
                  marks_obtained:true,
                  max_marks:true,
                  institute:{
                   select:{
                    name:true,
                    email:true
                   }
                  },
educationLevel:{
  select:{
    level_name:true
  }
}
                }
              },
              interviewParticipations:{
                take:1,
                orderBy:{
                   interview:{
                    scheduled_at:'desc'
                   }
                    
                },
                    select:{
                      
                        interview:{
                          
                          select:{
                            status:true,
 user:{
  select:{ 
    first_name:true,
    last_name:true,
    email:true,

   
  }
 }
                          }
                         
                        }
                    }
                },
                userSkills:{
                    select:{
                        skill:{
                         select:{
                            name:true
                         }
                        }
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
export const CandidateStatusUpdate=async(userId:string,status:string="REJECTED")=>{
try{
    const data=await prisma.user.update({
        where:{id:userId},
        data:{
            status:status
        }
    })
    return {data:data,isFailed:false};
}catch(error){
    console.error('Error in CandidateData service:', error);
    return {isFailed:true,data:null}
}
}
