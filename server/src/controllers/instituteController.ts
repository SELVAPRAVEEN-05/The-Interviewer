import { GetInstitute } from "../services/institute"

export const instituteController = async (req:any, res:any) => {
    return GetInstitute();
}