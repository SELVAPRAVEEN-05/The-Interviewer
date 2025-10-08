
import fastify from './src/middleware/jwt';
import { AdminDashboardRoute } from './src/routes/admin/admin';
import {  LoginUserRoute } from './src/routes/auth';
import { interviewer } from './src/routes/interviewer';
import { Registration } from './src/routes/registration';
import { Skill } from './src/routes/skill';
import { profile } from './src/routes/user';
fastify.get('/',{
            preHandler: [fastify.authenticateAdmin],
        }, async (request:any, reply:any) => {
  return { hello: 'world' }
})
fastify.get('/jwt', async (request:any, reply:any) => {
  console.log("Hi")
  return reply.status(200).send({ hello: 'world' })
})

fastify.register(LoginUserRoute,{prefix:"/api/auth"})
fastify.register(Skill,{prefix:"/api/skill"})
fastify.register(Registration,{prefix:"/api/register"})
fastify.register(AdminDashboardRoute,{prefix:"/api/admin"})
fastify.register(profile,{prefix:"/api/user"})
fastify.register(interviewer,{prefix:"/api/interviewer"})
// io.on('connection', (socket:any) => {
//     console.log('New client connected');

//     // Handle room joining
//     socket.on('join', (roomId:any) => {
//         socket.join(roomId);
//         io.to(roomId).emit('user-connected', socket.id);
//     });

//     // Handle ICE candidates
//     socket.on('ice-candidate', (candidate:any) => {
//         socket.to(roomId).emit('ice-candidate', candidate);
//     });

//     // Handle offer and answer SDP
//     socket.on('offer', (offer:any, roomId:any) => {
//         io.to(roomId).emit('offer', offer);
//     });

//     socket.on('answer', (answer:any, roomId:any) => {
//         io.to(roomId).emit('answer', answer);
//     });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });


const start = async () => {
  try {
    await fastify.listen({ port: 5000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()