import { FastifyInstance } from "fastify";
import { profileController, profileUpdateController } from "../controllers/userController";

export const profile=(fastify:FastifyInstance)=>{
    fastify.get('/profile',{preHandler:[fastify.authenticateAdmin]},profileController)
    fastify.put('/profile',{preHandler:[fastify.authenticateAdmin]},profileUpdateController)

}