import { FastifyReply, FastifyRequest } from "fastify";
import { interviewUpdate, shortlisted } from "../../services/interviewer/interview";

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

export const SelectedController = async (req: any, res: FastifyReply) => {
    const { interviewId,
        userId
     } = req.body as { interviewId: string, userId: string   };
    console.log("Update request:", { interviewId, userId });

    const result = await shortlisted(interviewId, userId);
    
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
