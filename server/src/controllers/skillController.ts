import { FastifyRequest } from "fastify";
import { GetSkills } from "../services/skillService";

export const skillController=async (req:FastifyRequest,res:any)=>{
return GetSkills();
}

import { GetFeedbackSkills } from "../services/skillService";

export const feedbackSkillController = async (req: FastifyRequest, res: any) => {
	return GetFeedbackSkills();
}

import { GetSkillsForInterview } from "../services/skillService";

export const skillsForInterviewController = async (req: any, res: any) => {
	const interviewId = req.params.id as string;
	if (!interviewId) return res.status(400).send({ message: 'interview id required', isFailed: true, data: null });
	const data = await GetSkillsForInterview(interviewId);
	return res.status(200).send({ message: 'success', isFailed: false, data });
}