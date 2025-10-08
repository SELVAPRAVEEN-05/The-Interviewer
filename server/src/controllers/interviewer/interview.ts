import { FastifyReply, FastifyRequest } from "fastify";
import { interviewUpdate } from "../../services/interviewer/interview";

export const interviewUpdateController = async (req: any, res: FastifyReply) => {
    const { interviewId } = req.params as { interviewId: string };
    const updateData = req.body;
    const userId = req.user.payload.id;

    console.log("Update request:", { interviewId, userId, updateData });

    const result = await interviewUpdate(interviewId, userId, updateData);
    
    if (result.isFailed) {
        return res.status(400).send({ 
            message: result.message, 
            isFailed: true, 
            data: null 
        });
    }
    
    return res.status(200).send({ 
        message: result.message, 
        isFailed: false, 
        data: result.data 
    });
};
