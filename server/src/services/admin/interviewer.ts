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
          role: 'INTERVIEWER',
        },
      }),
      prisma.user.count({
        where: {
          role: 'INTERVIEWER',
          status: 'APPROVED',
        },
      }),
     prisma.user.count({
        where: {
          role: 'INTERVIEWER',
          status: 'PENDING',
        },
      }),
      prisma.user.count({
        where: {
          role: 'INTERVIEWER',
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
        whereData['role']='INTERVIEWER'
        const data:any=await prisma.user.findMany({
            where:{
              role:'INTERVIEWER',
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
             Interview:{
              select:{
                id:true,
                status:true,
                scheduled_at:true,
                session_link:true,
                participants:{
                  take:1,
                orderBy:{
                   interview:{
                    scheduled_at:'desc'
                   }  
                },
                  select:{
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
    return {data:data,isFailed:false};
    }
    catch(error){
        console.error('Error fetching candidate data table:', error);
        return {isFailed:true,data:null}
    }
}