import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserService, ValidateUserService } from "../services/authService";

export async function ValidateUser(req: FastifyRequest, reply: FastifyReply) {
  const { email,password } = req.body as any;

  try {
    // Call the Login function
    const result = await ValidateUserService({ email,password });

    // If login was successful
    if (result.data) {
      
      // Send success response
      return reply.status(200).send({
        success: true,
        message: 'Login successful',
        data: result.data
      });
    } else {
      // If there was an error during login
      return reply.status(401).send({
        success: false,
        message: 'Login failed',
        error: 'Invalid credentials'
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    return reply.status(500).send({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
export async function CreateUser(req: FastifyRequest, reply: FastifyReply) {
  const { email,password } = req.body as { email: string,password: string };

  try {
    // Call the CreateUser function
    const result = await CreateUserService({ email,password });

    // If user creation was successful
    if (result.data) {
      
      // Send success response
      return reply.status(200).send({
        success: true,
        message: 'Login successful',
        data: result.data
      });
    } else {
      // If there was an error during login
      return reply.status(401).send({
        success: false,
        message: 'Login failed',
        error: 'Invalid credentials'
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    return reply.status(500).send({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}