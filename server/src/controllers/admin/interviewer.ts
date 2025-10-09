import { FastifyReply, FastifyRequest } from "fastify";
import { InterviewerData, InterviewerDataTable } from "../../services/admin/interviewer";

export const InterviewerDataController = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const data: any = await InterviewerData();
        if (data.isFailed) {
            return res.status(400).send({ message: "Error in fetching candidate data", Failed: true, data: null });
        }
        return res.status(200).send({ message: "Candidate data fetched successfully", Failed: false, data: data });
    } catch (error) {
        console.error('Error fetching candidate data:', error);
        return res.status(500).send({ message: "Internal Server Error", Failed: true, data: null });
    }
};
// Interface for query parameters
interface IntervewerTableQuery {
    status?: string;
    searchQuery?: string;
    page?: string;
    limit?: string;
    role?:string;
    department?:string;
}

export const InterviewerDataTableController = async (
    req: FastifyRequest<{ Querystring: IntervewerTableQuery }>, 
    res: FastifyReply
) => {
    try {
        // Extract and validate query parameters
        const status = req.query.status || '';
        const searchQuery = req.query.searchQuery || '';
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        const role=req.query.role || '';
        const department=req.query.department || '';
        // Validate numeric parameters
        if (isNaN(page) || page < 0) {
            return res.status(400).send({
                message: "Invalid page parameter. Must be a non-negative integer.",
                Failed: true,
                data: null
            });
        }
        const offset= (page-1) * limit; // Calculate offset based on page and limit
        if (isNaN(limit) || limit < 1 || limit > 100) {
            return res.status(400).send({
                message: "Invalid limit parameter. Must be between 1 and 100.",
                Failed: true,
                data: null
            });
        }

        // Call the service function with proper parameters
        const data: any = await InterviewerDataTable(status, searchQuery, offset, limit,role,department);
        
        if (data.isFailed) {
            return res.status(400).send({ message: "Error in fetching candidate data", Failed: true, data: null });
        }
        
        return res.status(200).send({ message: "Candidate data fetched successfully", Failed: false, data: data.data });
    } catch (error) {
        console.error('Error fetching candidate data:', error);
        return res.status(500).send({ message: "Internal Server Error", Failed: true, data: null });
    }
};