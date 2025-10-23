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
              profile_url:true,
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
                where:{
                  interview:{
                    scheduled_at:{
                      gte:new Date()
                    }
                  }
                },
                orderBy:{
                   interview:{
                    scheduled_at:'desc',
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
export const CandidateInterviewData=async(candidateId:string)=>{
try{
  console.log(candidateId)
    const [ totalCompletedCount, totalPendingCount, totalRejectionCount ]=await Promise.all([
      prisma.interview.count({
        where:{
          status:'COMPLETED',
          participants: {
            some: {
              userId: candidateId
            }
          }
        }
      }),
      prisma.interview.count({
        where:{
          status:'SCHEDULED',
           participants: {
            some: {
              userId: candidateId
            }
          }
        }
      }),

      prisma.interview.count({
        where:{
          status:'REJECTED',
          participants: {
            some: {
              userId: candidateId
            }
          },
        }
      })

    ])
      // Aggregate feedbackSkill values by skillId
      const rawScore = await prisma.feedbackSkill.groupBy({
        by: ['skillId'],
        where: {
          feedback: {
            given_to_user_id: candidateId,
          },
        },
        take: 5,
        orderBy: {
          _sum: {
            value: 'desc',
          },
        },
        _sum: {
          value: true,
        },
      });

      // Fetch skill names for the grouped skillIds and merge them into the result.
      const skillIds = rawScore.map((r: any) => r.skillId).filter(Boolean);
      let score: any[] = [];
      if (skillIds.length > 0) {
        const skills = await prisma.skill.findMany({
          where: { id: { in: skillIds } },
          select: { id: true, name: true },
        });

        score = rawScore.map((r: any) => {
          const skill = skills.find((s: any) => s.id === r.skillId);
          return {
            skillName: skill ? skill.name : null,
            // keep aggregated sums and other groupBy fields if needed
            _sum: r._sum,
          };
        });
      }
    return {data:{totalCompletedCount,totalPendingCount,totalRejectionCount,score},isFailed:false};
}catch(error){
    console.error('Error in CandidateData service:', error);
    return {isFailed:true,data:null}
}
}

