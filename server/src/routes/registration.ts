import { FastifyInstance } from "fastify";
import { CandidateRegistrationController, InterviewerRegistrationController } from "../controllers/registerController";
import { profileUpload } from "../lib/storage";

export const Registration = async (fastify: FastifyInstance) => {
	// Candidate registration (no file)
	fastify.post('/candidate' ,{preHandler: profileUpload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ])}, CandidateRegistrationController)

	// Interviewer registration with single profile upload field named 'profile'
	// fastify-multer exposes a middleware compatible with Fastify route `preHandler`.
	fastify.post(
		'/interviewer',
		{ preHandler: profileUpload.single('profile') },
		InterviewerRegistrationController
	)

}