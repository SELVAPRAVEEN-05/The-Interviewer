import { FastifyInstance } from "fastify";
import { profileController } from "../controllers/userController";

export const profile=(fastify:FastifyInstance)=>{
    fastify.get('/profile',{preHandler:[fastify.authenticateAdmin]},profileController)
}