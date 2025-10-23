import prisma from "../../lib/prisma";
// Cache duration: 5 minutes (300,000 ms)
const CACHE_DURATION = 5 * 60 * 1000;
let dashboardCache: any | null = null;

export const AdminDashboardService = async (): Promise<any> => {
  try {
    // Check if cached data is still valid
    const now = Date.now();
    if (dashboardCache && (now - dashboardCache.timestamp) < CACHE_DURATION) {
      return dashboardCache.data;
    }

    // Execute all queries in parallel for better performance
    const [
      totalCandidateUsers,
      totalRecruiterUsers,
      totalScheduledInterviews,
      totalCompletedInterviews,
      totalCancelledInterviews,
      totalPendingInterviews,
      totalActiveCandidates,
      totalActiveRecruiters,
      totalPendingCandidates,
      totalPendingRecruiters,

    ] = await Promise.all([
      prisma.user.count({
        where: {
          role: 'CANDIDATE',
        },
      }),
      prisma.user.count({
        where: {
          role: 'INTERVIEWER',
        },
      }),
      prisma.interview.count({
        where: {
          status: 'SCHEDULED',
        },
      }),
      prisma.interview.count({
        where: {
          status: 'COMPLETED',
        },
      }),
      prisma.interview.count({
        where: {
          status: 'CANCELLED',
        },
      }),
      prisma.interview.count({
        where: {
          status: 'PENDING',
        },
      }),
       prisma.user.count({
        where: {
          status: 'APPROVED',
          role:'CANDIDATE'
        },
      }),
      prisma.user.count({
        where: {
          status: 'REJECTED',
          role:'RECRUITER'
        },
      }),
      prisma.user.count({
        where: {
          status: 'PENDING',
          role:'CANDIDATE'
        },
      }),
      prisma.user.count({
        where: {
          status: 'PENDING',
          role:'RECRUITER'
        },
      }),
      
       
       
    ]);

    const result: any = {
      totalCandidateUsers,
      totalRecruiterUsers,
      totalScheduledInterviews,
      totalCompletedInterviews,
      totalPendingCandidates,
      totalPendingRecruiters,
      interview:{
        totalCancelledInterviews,
        totalPendingInterviews,
        totalScheduledInterviews,
        totalCompletedInterviews,
      }
      
    };

    // Update cache
    dashboardCache = {
      data: result,
      timestamp: now,
    };

    return {data:result,isFailed:false};
  } catch (error) {
    console.error('Error fetching admin dashboard statistics:', error);
    // throw new Error('Failed to fetch dashboard statistics');
    return {isFailed:true,data:null}
  }
};

// Helper function to clear cache (useful for testing or when data is updated)
export const clearDashboardCache = (): void => {
  dashboardCache = null;
};