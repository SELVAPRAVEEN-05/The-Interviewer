import { FastifyReply, FastifyRequest } from "fastify";
import { upcomingInterviewsService } from "../../services/admin/interview";

// Interface for query parameters
interface UpcomingInterviewsQuery {
  page?: string;
  limit?: string;
}

export const upcomingInterviewsController = async (
  req: FastifyRequest<{ Querystring: UpcomingInterviewsQuery }>, 
  res: FastifyReply
) => {
  try {
    // Extract and parse query parameters
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    
    // Validate query parameters
    if (isNaN(page) || page < 1) {
      return res.status(400).send({ 
        data: null, 
        isFailed: true, 
        message: 'Invalid page parameter. Must be a positive integer.' 
      });
    }
    
    if (isNaN(limit) || limit < 1 || limit > 100) {
      return res.status(400).send({ 
        data: null, 
        isFailed: true, 
        message: 'Invalid limit parameter. Must be between 1 and 100.' 
      });
    }
    
    // Call service with pagination parameters
    const result = await upcomingInterviewsService({ page, limit });
    
    return res.status(200).send({ 
      data: result.data,
      pagination: result.pagination,
      isFailed: false 
    });
  } catch (error) {
    console.error('Error fetching upcoming interviews:', error);
    
    // Handle specific error messages
    if (error instanceof Error) {
      return res.status(400).send({ 
        data: null, 
        isFailed: true, 
        message: error.message 
      });
    }
    
    return res.status(500).send({ 
      data: null, 
      isFailed: true, 
      message: 'Internal server error' 
    });
  }
};
