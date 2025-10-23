import { FastifyReply, FastifyRequest } from "fastify";
import { CandidateRegistrationService, InterviewerRegistrationService } from "../services/registerService";

export const CandidateRegistrationController = async (req: any, res: FastifyReply) => {
  // When using `profileUpload.fields(...)` multer will populate `req.files`
  // with an object mapping fieldname -> File[]. Other form fields are on req.body.
  const files = (req.files as any) || {}
  const body = req.body || {}

  // helper to safely parse JSON string fields received via multipart/form-data
  const parseIfJson = (val: any) => {
    if (val === undefined || val === null) return undefined
    if (typeof val === 'string') {
      try {
        return JSON.parse(val)
      } catch (e) {
        // not JSON, return original string
        return val
      }
    }
    return val
  }

  const profileFile = files.profile && files.profile[0]
  const resumeFile = files.resume && files.resume[0]

  const data: any = {
    ...body,
    // prefer uploaded files if present, otherwise allow client-provided URLs
    profile: profileFile ? profileFile.path : body.profile_picture_url || null,
    resume: resumeFile ? resumeFile.path : body.resume_url || null,
    // parse nested JSON fields that are passed as strings in the multipart form
    skills: parseIfJson(body.skills),
    education: parseIfJson(body.education),
    sslc: parseIfJson(body.sslc),
    hsl: parseIfJson(body.hsl),
  }

  const temp = await CandidateRegistrationService(data)
  if (temp.Failed) {
    return res.status(400).send(temp)
  }
  return res.status(200).send(temp)
}

export const InterviewerRegistrationController = async (req: any, res: FastifyReply) => {
  // Using fastify-multer `profileUpload.single('profile')` as preHandler puts
  // uploaded file info on `req.file` and other form fields on `req.body`.
  const file = req.file as any | undefined
  const body = req.body || {}
  console.log(file, body)
  const data: any = {
    ...body,
    profile: file ? file.path : null,
  }

  const temp = await InterviewerRegistrationService(data)
  if (temp.Failed) {
    return res.status(400).send(temp)
  }
  return res.status(200).send(temp)
}