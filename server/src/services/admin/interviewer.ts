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
        // Fetch users (without loading full Interview arrays)
        const users:any = await prisma.user.findMany({
            where: {
              role: 'INTERVIEWER',
              userPositions:{
                some:{
                  position:{
                    department:{
                      contains:department,mode:'insensitive'
                    }
                  }
                  
                }
              },
              ...whereData
            },
            take: limit,
            skip: offset,
            select: {
              id: true,
              profile_url: true,
              role: true,
              mobile_number: true,
              gender: {
                select: {
                  value: true
                }
              },
              first_name: true,
              last_name: true,
              email: true,
              status: true,
              created_at: true,
              yoe: true,
              userPositions: {
                select: {
                  position: {
                    select: {
                      department: true,
                      title: true
                    }
                  },
                  brand: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
        });

        // If no users found, return early
        if (!users || users.length === 0) {
            return { data: [], isFailed: false };
        }

        const userIds = users.map((u: any) => u.id);

        // Group interviews by interviewerId and status to compute counts per status
        const interviewsByStatus = await prisma.interview.groupBy({
            by: ['interviewerId', 'status'],
            where: {
                interviewerId: { in: userIds }
            },
            _count: {
                _all: true
            }
        });
        console.log(interviewsByStatus)

        // Group interview participants for shortlist counts (sortlisted = true)
        // const shortlistedByUser = await prisma.interviewParticipant.groupBy({
        //     by: ,
        //     where: {
        //         userId: { in: userIds },
        //         sortlisted: true
        //     },
        //     _count: {
        //         _all: true
        //     }
        // });
        const shortlistedByUser = await prisma.interview.groupBy({
            by: ['interviewerId'],
            where: {
                interviewerId: { in: userIds },
                participants:{
                    some:{
                      sortlisted:true
                    }
                }
            },
            _count:{
              _all:true
            }
        })


        // Build maps for quick lookup
        const statsMap: Record<string, { total: number; scheduled: number; completed: number }> = {};
        for (const id of userIds) {
            statsMap[id] = { total: 0, scheduled: 0, completed: 0 };
        }

        for (const row of interviewsByStatus as any[]) {
            const id = row.interviewerId as string;
            const cnt = row._count?._all ?? 0;
            const statusVal = (row.status || '').toUpperCase();
            statsMap[id] = statsMap[id] || { total: 0, scheduled: 0, completed: 0 };
            statsMap[id].total += cnt;
            if (statusVal === 'SCHEDULED') statsMap[id].scheduled += cnt;
            if (statusVal === 'COMPLETED') statsMap[id].completed += cnt;
        }

        const shortlistMap: Record<string, number> = {};
        for (const row of shortlistedByUser as any[]) {
            const id = row.userId as string;
            shortlistMap[id] = row._count?._all ?? 0;
        }

        // Attach interviewStats to each user
        const data = users.map((u: any) => {
            const s = statsMap[u.id] || { total: 0, scheduled: 0, completed: 0 };
            const shortlisted = shortlistMap[u.id] || 0;
            return {
                ...u,
                interviewStats: {
                    total: s.total,
                    scheduled: s.scheduled,
                    completed: s.completed,
                    shortlisted
                }
            };
        });

        return { data, isFailed: false };
    }
    catch(error){
        console.error('Error fetching candidate data table:', error);
        return {isFailed:true,data:null}
    }
}