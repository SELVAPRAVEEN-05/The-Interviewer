import prisma from "../../lib/prisma";

// Interfaces for pagination
interface PaginationParams {
  page?: number;
  limit?: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const upcomingInterviewsService = async (params: PaginationParams = {}) => {
  try {
    // Set default values
    const page = params.page || 1;
    const limit = params.limit || 10;
    
    // Validate parameters
    if (page < 1) throw new Error('Page must be greater than 0');
    if (limit < 1 || limit > 100) throw new Error('Limit must be between 1 and 100');
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Define the where condition for upcoming interviews
    const whereCondition = {
      scheduled_at: {
        gte: new Date() // Only upcoming interviews
      }
    };
    
    // Execute count and data queries in parallel for better performance
    const [totalItems, interviews] = await Promise.all([
      prisma.interview.count({
        where: whereCondition
      }),
      prisma.interview.findMany({
        where: whereCondition,
        orderBy: {
          scheduled_at: 'asc'
        },
        select: {
          scheduled_at: true,
          status: true,
          session_link: true,
          interviewerId: true,
          user:{
            select:{
              first_name:true,
              last_name:true,
              email:true,
              role:true
            }
          },
          participants: {
            select: {
              user: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  email: true,
                  role: true
                }
              }
            }
          }
        },
        skip,
        take: limit
      })
    ]);
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalItems / limit);
    
    const paginatedResponse: PaginatedResponse<any> = {
      data: interviews,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
    
    return paginatedResponse;
    
  } catch (error) {
    console.error('Error in upcomingInterviewsService:', error);
    throw error;
  }
};